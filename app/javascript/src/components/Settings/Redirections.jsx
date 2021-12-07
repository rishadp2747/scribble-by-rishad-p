import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Delete, Highlight } from "neetoicon";
import { Typography, Table, Button } from "neetoui";
import { Input } from "neetoui/formik";

import { CHANGE_TABLE_DESIGN } from "components/Settings/constant";

const EditableRow = ({ ...props }) => {
  return <tr {...props} />;
};

const EditableCell = ({
  editing,
  dataIndex,
  record,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Input name={dataIndex} type="text" value={record[dataIndex]} />
      ) : (
        children
      )}
    </td>
  );
};

const Redirections = () => {
  const [editingKey, setEditingKey] = useState("");
  const isEditing = record => record.id === editingKey;

  useEffect(() => {
    CHANGE_TABLE_DESIGN();
  }, []);

  const components = {
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
      ellipsis: true,
      editable: true,
    },
    {
      title: "To Path",
      dataIndex: "to_path",
      key: "toPath",
      width: 270,
      ellipsis: true,
      editable: true,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      render: redirection => {
        isEditing(redirection);
        return REDIRECTIONS_ACTIONS(redirection);
      },
      width: 80,
    },
  ];

  const TABLE_DATA = [
    {
      id: 1,
      from_path: "kl",
      to_path: "help",
    },
    {
      id: 2,
      from_path: "kl",
      to_path: "help",
    },
  ];

  const edit = record => {
    setEditingKey(record.id);
  };

  const columns = TABLE_COLUMNS.map(col => {
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

  const REDIRECTIONS_ACTIONS = record => (
    <div className="flex flex-row justify-end space-x-6">
      <Button style="text" icon={() => <Delete size={16} />} />

      <Button
        style="text"
        icon={() => <Highlight size={16} />}
        onClick={() => edit(record)}
      />
    </div>
  );

  const INITIAL_VALUE = {
    from_path: "",
    to_path: "",
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
        <Formik initialValues={INITIAL_VALUE}>
          <Form>
            <Table
              components={components}
              rowSelection={false}
              columnData={columns}
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
