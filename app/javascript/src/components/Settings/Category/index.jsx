import React, { useState } from "react";

import { arrayMoveImmutable } from "array-move";
import { Formik, Form } from "formik";
import { Reorder, Plus, Check } from "neetoicon";
import { Button, Table } from "neetoui";
import { Input } from "neetoui/formik";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";

import EditableCell from "components/Settings/Category/EditableCell";
import { CATEGORIES_FORM_VALIDATION_SCHEMA } from "components/Settings/constant";
import Header from "components/Settings/Header";
import ActionBlock from "components/Settings/Redirection/ActionBlock";

const TABLE_DATA = [
  {
    id: 1,
    index: 0,
    title: "Getting Started",
  },
  {
    id: 2,
    index: 1,
    title: "neeto products",
  },
];

const Category = () => {
  const [data, setData] = useState(TABLE_DATA);
  const [addCategory, setAddCategory] = useState(false);
  const [editingRecord, setEditingRecord] = useState("");

  const SortableItem = sortableElement(props => <tr {...props} />);
  const SortableContainer = sortableContainer(props => <tbody {...props} />);
  const DragHandle = sortableHandle(() => <Reorder size={16} />);

  const isEditing = record => editingRecord === record.index;

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
            handleRecordEdit={handleRecordEdit}
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
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
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

      setData(
        newData.map((data, index) => {
          data.index = index;
          return data;
        })
      );
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
      data => data.index === restProps["data-row-key"]
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

  const handleRecordEdit = record => {
    setEditingRecord(record.index);
  };

  const handleCategoryDelete = category => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category"
    );
    if (confirmDelete) {
      setData(data.filter(data => data.id !== category.id));
    }
  };

  const handleSubmit = values => {
    setAddCategory(false);
    if (values.addCategory) {
      setData(data => [...data, { title: values.addCategory }]);
    }

    if (values.editRecord) {
      setData(data => [...data, { title: values.editRecord }]);
    }
  };

  return (
    <>
      <Header
        title="Manage Categories"
        subTitle="Create and configure the categories inside your scribble."
      />

      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={{
          addCategory: "",
          editRecord: editingRecord !== "" && data[editingRecord]?.title,
          categories: data,
        }}
        validationSchema={CATEGORIES_FORM_VALIDATION_SCHEMA}
      >
        {({ handleSubmit }) => (
          <Form>
            {addCategory ? (
              <Input
                name="addCategory"
                type="text"
                className="w-1/2"
                suffix={
                  <Check className="cursor-pointer" onClick={handleSubmit} />
                }
              />
            ) : (
              <Button
                style="link"
                label="Add new category"
                iconPosition="left"
                className="w-36"
                icon={() => <Plus size={16} />}
                onClick={() => setAddCategory(true)}
              />
            )}

            <Table
              rowSelection={false}
              rowKey="index"
              className="redirection-table-row"
              rowData={data}
              columnData={editableTableColumns}
              components={TABLE_COMPONENTS}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Category;
