import React, { useEffect, useState } from "react";

import { arrayMoveImmutable } from "array-move";
import { Reorder, Plus, Check } from "neetoicon";
import { Button, Table, Input } from "neetoui";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";

import categoryApi from "apis/category";
import { DELETE_ALERT_MESSAGE } from "common/message";
import ActionBlock from "components/Dashboard/Settings/ActionBlock";
import {
  INITIAL_ADD_CATEGORY,
  INITIAL_EDIT_CATEGORY,
} from "components/Dashboard/Settings/constant";
import Header from "components/Dashboard/Settings/Header";
import BodyCell from "components/Dashboard/Settings/ManageCategory/Table/Body/Cell";

const Category = ({ setLoading }) => {
  const [categories, setCategories] = useState([]);
  const [editingRecord, setEditingRecord] = useState("");
  const [addCategory, setAddCategory] = useState(INITIAL_ADD_CATEGORY);
  const [editCategory, setEditCategory] = useState(INITIAL_EDIT_CATEGORY);

  const SortableItem = sortableElement(props => <tr {...props} />);
  const SortableContainer = sortableContainer(props => <tbody {...props} />);
  const DragHandle = sortableHandle(() => <Reorder size={16} />);

  const isEditing = record => editingRecord === record.position;

  useEffect(() => fetchCategories(), []);

  const TABLE_COLUMNS = [
    {
      dataIndex: "",
      key: "",
      width: 10,
      render: () => <DragHandle />,
    },
    {
      dataIndex: "title",
      key: "title",
      editable: true,
    },
    {
      dataIndex: "",
      key: "",
      width: 80,
      render: category =>
        !isEditing(category) && (
          <ActionBlock
            record={category}
            handleEditRecord={record => handleEditCategory(record)}
            handleDeleteRecord={handleCategoryDelete}
            isRecordEditing={isEditing(category)}
          />
        ),
    },
  ];

  const editableTableColumns = TABLE_COLUMNS.map(column => {
    if (!column.editable) {
      return column;
    }

    return {
      ...column,
      onCell: record => ({
        editCategory,
        handleEditCategoryValue,
        handleSubmitEditCategory,
        isRecordEditing: isEditing(record),
      }),
    };
  });

  const handleReorderCategories = async ({ oldIndex, newIndex }) => {
    setEditingRecord("");

    if (oldIndex !== newIndex) {
      const reorderedCategories = arrayMoveImmutable(
        [].concat(categories),
        oldIndex,
        newIndex
      ).map((category, index) => {
        category.position = index + 1;
        return category;
      });

      const reorderedCategory = reorderedCategories[newIndex];

      try {
        await categoryApi.reorder(reorderedCategory.id, reorderedCategory);
      } finally {
        setCategories(reorderedCategories);
      }
    }
  };

  const DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={handleReorderCategories}
      {...props}
    />
  );

  const DraggableBodyRow = ({ ...restProps }) => {
    const index = categories.findIndex(
      category => category.position === restProps["data-row-key"]
    );

    return <SortableItem index={index} {...restProps} />;
  };

  const TABLE_COMPONENTS = {
    body: {
      wrapper: DraggableContainer,
      row: DraggableBodyRow,
      cell: BodyCell,
    },
  };

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const response = await categoryApi.list();
      const categories = response.data?.categories;
      response.data?.categories && setCategories(categories);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryDelete = async deletedCategory => {
    const confirmDelete = confirm(DELETE_ALERT_MESSAGE("category"));

    if (confirmDelete) {
      setLoading(true);

      try {
        const response = await categoryApi.destroy(deletedCategory.id);

        response.data?.notice &&
          setCategories(
            categories.filter(category => category.id !== deletedCategory.id)
          );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCategoryValue = e => {
    const value = e.target.value;
    const error = value.trim() === "" && "Required";

    setEditCategory(editCategory => ({
      ...editCategory,
      value: { ...editCategory.value, title: value },
      error: error,
    }));
  };

  const handleEditCategory = category => {
    setEditingRecord(category.position);
    setEditCategory(editCategory => ({
      ...editCategory,
      value: category,
    }));
  };

  const handleAddCategoryValue = e => {
    const value = e.target.value;
    const error = value.trim() === "" && "Required";
    setAddCategory({ show: true, value: value, error: error });
  };

  const handleSubmitAddCategory = async () => {
    const error = addCategory.value.trim() === "" && "Required";
    setAddCategory({ show: true, value: "", error: error });

    if (!error) {
      setLoading(true);

      try {
        const payload = { category: { title: addCategory.value } };
        const response = await categoryApi.create(payload);
        if (response.data?.notice) {
          fetchCategories();
          setAddCategory(addCategory => ({ ...addCategory, show: false }));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmitEditCategory = async () => {
    const error = editCategory.value.title.trim() === "" && "Required";
    setAddCategory(editCategory => ({ ...editCategory, error: error }));

    if (!error) {
      setLoading(true);

      try {
        const { id, title, position } = editCategory.value;
        const payload = {
          category: { title, position },
        };
        const response = await categoryApi.update(id, payload);

        if (response.data?.notice) {
          const editedCategories = categories;

          const editedCategoryIndex = editedCategories.findIndex(
            editedCategory => editedCategory.id === id
          );
          editedCategories[editedCategoryIndex] = editCategory.value;
          setCategories([...editedCategories]);
          setEditingRecord("");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header
        title="Manage Categories"
        subTitle="Create and configure the categories inside your scribble."
      />
      <div>
        {addCategory.show ? (
          <Input
            type="text"
            name="addCategory"
            className="w-1/2"
            error={addCategory.error}
            onChange={handleAddCategoryValue}
            suffix={
              <Check
                className="cursor-pointer"
                onClick={handleSubmitAddCategory}
              />
            }
          />
        ) : (
          <Button
            style="link"
            label="Add new category"
            iconPosition="left"
            className="w-36"
            icon={() => <Plus size={16} />}
            onClick={() => setAddCategory({ show: true, value: "" })}
          />
        )}
        <Table
          rowSelection={false}
          rowKey="position"
          className="redirection-table-row"
          rowData={categories}
          columnData={editableTableColumns}
          components={TABLE_COMPONENTS}
        />
      </div>
    </>
  );
};

export default Category;
