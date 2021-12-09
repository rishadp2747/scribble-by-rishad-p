import React, { useEffect, useState } from "react";

import { arrayMoveImmutable } from "array-move";
import { Reorder, Plus, Check } from "neetoicon";
import { Button, Table, Input } from "neetoui";
// import { Input } from "neetoui/formik";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";

import categoryApi from "apis/category";
import EditableCell from "components/Settings/Category/EditableCell";
import Header from "components/Settings/Header";
import ActionBlock from "components/Settings/Redirection/ActionBlock";

const Category = ({ setLoading }) => {
  const [data, setData] = useState([]);
  const [editingRecord, setEditingRecord] = useState("");
  const [addCategory, setAddCategory] = useState({
    show: false,
    vlaue: "",
    error: "",
  });

  const [editCategory, setEditCategory] = useState({
    value: "",
    error: "",
  });

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
      render: category =>
        !isEditing(category) && (
          <ActionBlock
            record={category}
            handleRecordEdit={record => handleEditCategory(record)}
            handleRecordDelete={handleCategoryDelete}
            isRecordEditing={isEditing(category)}
          />
        ),
      width: 80,
    },
  ];

  const editableTableColumns = TABLE_COLUMNS.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        editCategory,
        handleEditCategoryValue,
        handleSubmitEditCategory,
        isRecordEditing: isEditing(record),
      }),
    };
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setEditingRecord("");
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        [].concat(data),
        oldIndex,
        newIndex
      ).filter(el => !!el);
      setData(newData);
    }
  };

  const DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ ...restProps }) => {
    const index = data.findIndex(
      data => data.position === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  };

  const TABLE_COMPONENTS = {
    body: {
      wrapper: DraggableContainer,
      row: DraggableBodyRow,
      cell: EditableCell,
    },
  };

  const handleCategoryDelete = category => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category"
    );
    if (confirmDelete) {
      setData(data.filter(data => data.id !== category.id));
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.list();
      const categories = response.data?.categories;

      if (categories) {
        setData(categories);
      }
    } finally {
      setLoading(false);
    }
  };

  //final
  const handleEditCategoryValue = e => {
    const value = e.target.value;
    const error = value.trim() === "" && "Required";

    setEditCategory(editCategory => ({
      ...editCategory,
      value: { ...editCategory.value, title: value },
      error: error,
    }));
  };

  //finale
  const handleEditCategory = category => {
    setEditingRecord(category.position);
    setEditCategory(editCategory => ({
      ...editCategory,
      value: category,
    }));
  };

  //final
  const handleAddCategoryValue = e => {
    const value = e.target.value;
    const error = value.trim() === "" && "Required";
    setAddCategory({ show: true, value: value, error: error });
  };

  //final
  const handleSubmitAddCategory = async () => {
    const error = addCategory.value.trim() === "" && "Required";
    setAddCategory({ show: true, value: "", error: error });
    if (!error) {
      setLoading(true);
      try {
        const payload = { category: { title: addCategory.value } };
        const response = await categoryApi.create(payload);
        response.data?.category &&
          setData(data => [...data, response.data?.category]);
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
          setEditingRecord("");
          const categories = data;
          categories[position] = editCategory.value;
          setData([...categories]);
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
          rowData={data}
          columnData={editableTableColumns}
          components={TABLE_COMPONENTS}
        />
      </div>
    </>
  );
};

export default Category;
