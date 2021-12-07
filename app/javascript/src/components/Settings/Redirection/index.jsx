import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Typography, Table } from "neetoui";

import {
  CHANGE_TABLE_DESIGN,
  REDIRECTION_FORM_INITIAL_VALUE,
  REDIRECTION_FORM_VALIDATION_SCHEMA,
} from "components/Settings/constant";
import EditableRow from "components/Settings/Redirection//EditableRow";
import EditableCell from "components/Settings/Redirection/EditableCell";

import ActionBlock from "./ActionBlock";

const Redirections = () => {
  const [editingRecord, setEditingRecord] = useState("");

  useEffect(() => {
    CHANGE_TABLE_DESIGN();
  }, []);

  const TABLE_COMPONENTS = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
      width: 270,
      editable: true,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      render: redirection => (
        <ActionBlock
          record={redirection}
          editRecordHandler={handleRecordEdit}
        />
      ),
      width: 80,
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
        editing: record.id === editingRecord,
      }),
    };
  });

  const TABLE_DATA = [
    {
      id: 1,
      from_path: "https://scribble.com/welcome",
      to_path: "https://scribble.com",
    },
    {
      id: 2,
      from_path: "https://scribble.com/welcome",
      to_path: "https://scribble.com/about-us",
    },
  ];

  const handleRecordEdit = ({ id }) => {
    setEditingRecord(id);
  };

  return (
    <>
      <div>
        <Typography style="h2">Redirections</Typography>
        <Typography style="body1">
          Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly.
        </Typography>
      </div>

      <div className="p-6 bg-indigo-50">
        <Formik
          enableReinitialize
          initialValues={REDIRECTION_FORM_INITIAL_VALUE}
          validationSchema={REDIRECTION_FORM_VALIDATION_SCHEMA}
        >
          <Form>
            <Table
              components={TABLE_COMPONENTS}
              rowSelection={false}
              columnData={EDITABLE_TABLE_COLUMNS}
              rowData={TABLE_DATA}
              className="redirection-table-row"
            />
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Redirections;
