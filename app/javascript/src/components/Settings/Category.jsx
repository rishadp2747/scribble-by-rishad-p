import React, { useState } from "react";

import { arrayMoveImmutable } from "array-move";
import { Reorder } from "neetoicon";
import { Table } from "neetoui";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";

import Header from "components/Settings/Header";
import ActionBlock from "components/Settings/Redirection/ActionBlock";

const TABLE_DATA = [
  {
    id: 1,
    title: "Getting Started",
  },
  {
    id: 2,
    title: "neeto products",
  },
];

const Category = () => {
  const [data, setData] = useState(TABLE_DATA);

  const SortableItem = sortableElement(props => <tr {...props} />);
  const SortableContainer = sortableContainer(props => <tbody {...props} />);
  const DragHandle = sortableHandle(() => <Reorder />);

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
    },
    {
      dataIndex: "",
      key: "",
      render: category => (
        <ActionBlock record={category} editRecordHandler={handleRecordEdit} />
      ),
      width: 80,
    },
  ];

  const handleRecordEdit = () => {};

  const onSortEnd = ({ oldIndex, newIndex }) => {
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
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex(data => data.id === restProps["data-row-key"]);
    return <SortableItem index={index} {...restProps} />;
  };

  const TABLE_COMPONENTS = {
    body: {
      wrapper: DraggableContainer,
      row: DraggableBodyRow,
    },
  };

  return (
    <>
      <Header
        title="Manage Categories"
        subTitle="Create and configure the categories inside your scribble."
      />
      <Table
        rowSelection={false}
        rowKey="id"
        columnData={TABLE_COLUMNS}
        rowData={TABLE_DATA}
        className="redirection-table-row"
        components={TABLE_COMPONENTS}
      />
    </>
  );
};

export default Category;
