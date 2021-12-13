import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Table } from "neetoui";

import ActionBlock from "components/Settings/ActionBlock";
import { REDIRECTION_FORM_VALIDATION_SCHEMA } from "components/Settings/constant";
import Header from "components/Settings/Header";
import CustomTable from "components/Settings/Redirection/Table";
import BodyCell from "components/Settings/Redirection/Table/Body/Cell";
import BodyRow from "components/Settings/Redirection/Table/Body/Row";
import HeaderCell from "components/Settings/Redirection/Table/Header/Cell";

const TABLE_COMPONENTS = {
  table: CustomTable,
  header: {
    cell: HeaderCell,
  },
  body: {
    row: BodyRow,
    cell: BodyCell,
  },
};

const TABLE_DATA = [
  {
    id: 1,
    from_path: "welcome",
    to_path: "https://scribble.com",
  },
  {
    id: 2,
    from_path: "abput",
    to_path: "https://scribble.com",
  },
  {
    id: 3,
    from_path: "sample",
    to_path: "https://scribble.com",
  },
];

const INITIAL_FORM_VALUE = {
  id: "",
  from_path: "",
  to_path: "",
};

const Redirections = () => {
  const [redirections, setRedirections] = useState(TABLE_DATA);
  const [editingRedirection, setEditingRedirection] =
    useState(INITIAL_FORM_VALUE);

  const TABLE_COLUMNS = [
    {
      title: "From Path",
      dataIndex: "from_path",
      key: "fromPath",
      width: 270,
      editable: true,
    },
    {
      title: "To Path",
      dataIndex: "to_path",
      key: "toPath",

      editable: true,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      render: redirection => (
        <ActionBlock
          record={redirection}
          editingRecord={editingRedirection}
          handleEditRecord={handleEditRedirection}
          handleDeleteRecord={handleDeleteRedirection}
        />
      ),
      width: 100,
    },
  ];

  const EDITABLE_TABLE_COLUMNS = TABLE_COLUMNS.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: record.id === editingRedirection.id,
      }),
    };
  });

  const handleEditRedirection = redirection => {
    setEditingRedirection(redirection);
  };

  const handleDeleteRedirection = redirection => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this redirection"
    );
    if (confirmDelete) {
      setRedirections(redirections.filter(({ id }) => id !== redirection.id));
    }
  };

  const handleSubmit = async () => {};

  return (
    <>
      <Header
        title="Redirections"
        subTitle="Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly."
      />
      <div className="p-6 bg-indigo-50">
        <Formik
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={editingRedirection}
          validationSchema={REDIRECTION_FORM_VALIDATION_SCHEMA}
        >
          <Form>
            <Table
              components={TABLE_COMPONENTS}
              rowSelection={false}
              columnData={EDITABLE_TABLE_COLUMNS}
              rowData={redirections}
              className="redirection-table-row"
            />
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Redirections;
