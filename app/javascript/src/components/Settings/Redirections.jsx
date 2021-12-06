import React from "react";

// import { Formik, Form } from "formik";
import { Delete, Highlight } from "neetoicon";
import { Typography, Table, Button } from "neetoui";
// import { Input, Checkbox } from "neetoui/formik";

const Redirections = () => {
  const TABLE_COLUMNS = [
    {
      title: "From Path",
      dataIndex: "fromPath",
      key: "fromPath",
      width: 150,
      ellipsis: true,
    },
    {
      title: "To Path",
      dataIndex: "toPath",
      key: "toPath",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      render: redirection => REDIRECTIONS_ACTIONS(redirection),
      width: 100,
    },
  ];

  const REDIRECTIONS_ACTIONS = () => (
    <div className="flex flex-row space-x-2">
      <Button style="text" icon={() => <Delete size={16} />} />

      <Button style="text" icon={() => <Highlight size={16} />} />
    </div>
  );

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

      <div className="bg-indigo-100 border bordre-green-800">
        <Table
          rowSelection={false}
          columnData={TABLE_COLUMNS}
          rowData={[]}
          className="bg-indigo-100"
        />
      </div>
    </>
  );
};

export default Redirections;
