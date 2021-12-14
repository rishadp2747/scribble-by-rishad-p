import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Plus } from "neetoicon";
import { Table, Button } from "neetoui";

import redirectionApi from "apis/redirection";
import { DELETE_ALERT_MESSAGE } from "common/message";
import ActionBlock from "components/Settings/ActionBlock";
import {
  DEFAULT_EDITING_REDIRECTION,
  REDIRECTION_FORM_VALIDATION_SCHEMA,
} from "components/Settings/constant";
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

const Redirections = ({ setLoading }) => {
  const [redirections, setRedirections] = useState([]);
  const [isAddedRedirection, setIsAddedRedirection] = useState(false);
  const [editingRedirection, setEditingRedirection] = useState(
    DEFAULT_EDITING_REDIRECTION
  );

  useEffect(() => {
    fetchRedirections();
  }, []);

  const TABLE_COLUMNS = [
    {
      title: "From Path",
      dataIndex: "from_path",
      key: "fromPath",
      width: 200,
      editable: true,
    },
    {
      title: "To Path",
      dataIndex: "to_path",
      key: "toPath",
      width: 200,
      ellipsis: true,
      editable: true,
    },
    {
      key: "",
      title: "Actions",
      dataIndex: "",
      width: 100,
      render: redirection => (
        <ActionBlock
          record={redirection}
          editingRecord={editingRedirection}
          handleEditRecord={handleEditRedirection}
          handleDeleteRecord={handleDeleteRedirection}
        />
      ),
    },
  ];

  const EDITABLE_TABLE_COLUMNS = TABLE_COLUMNS.map(column => {
    if (!column.editable) {
      return column;
    }

    return {
      ...column,
      onCell: record => ({
        dataIndex: column.dataIndex,
        editing: record.id === editingRedirection.id,
      }),
    };
  });

  const fetchRedirections = async () => {
    setLoading(true);

    try {
      const response = await redirectionApi.list();
      setRedirections(response.data?.redirections);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRedirection = redirection => {
    setIsAddedRedirection(false);
    setEditingRedirection(redirection);
  };

  const handleDeleteRedirection = async redirection => {
    const confirmDelete = confirm(DELETE_ALERT_MESSAGE("redirection"));

    if (confirmDelete) {
      setLoading(true);

      try {
        const response = await redirectionApi.destroy(redirection.id);

        if (response.data?.notice) {
          const latestRedirections = redirections.filter(
            ({ id }) => id !== redirection.id
          );
          setRedirections(latestRedirections);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddRedirection = () => {
    if (!isAddedRedirection) {
      const newRedirection = {
        from_path: "",
        to_path: "",
      };

      setRedirections(redirections => [...redirections, newRedirection]);
      setEditingRedirection(newRedirection);
      setIsAddedRedirection(true);
    }
  };

  const handleSubmitAddRedirection = async values => {
    setLoading(true);

    try {
      const payload = { redirection: values };
      const response = await redirectionApi.create(payload);

      if (response.data?.notice) {
        const latestRedirections = redirections;
        const lastIndex = latestRedirections.length - 1;
        latestRedirections[lastIndex] = response.data?.redirection;
        setIsAddedRedirection(false);
        setRedirections([...latestRedirections]);
        setEditingRedirection(DEFAULT_EDITING_REDIRECTION);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEditRedirection = async values => {
    setLoading(true);

    try {
      const payload = { redirection: values };
      const response = await redirectionApi.update(values.id, payload);

      if (response.data?.notice) {
        const latestRedirections = redirections.map(redirection =>
          redirection.id === values.id ? values : redirection
        );
        setRedirections(latestRedirections);
        setEditingRedirection(DEFAULT_EDITING_REDIRECTION);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async values => {
    if (isAddedRedirection) {
      handleSubmitAddRedirection(values);
    } else {
      handleSubmitEditRedirection(values);
    }
  };

  return (
    <>
      <Header
        title="Redirections"
        subTitle="Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly."
      />
      <div className="p-6 space-y-4 bg-indigo-50">
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
        <Button
          style="link"
          label="Add New Redirection"
          iconPosition="left"
          onClick={handleAddRedirection}
          disabled={isAddedRedirection}
          icon={() => <Plus size={16} className="mr-2" />}
        />
      </div>
    </>
  );
};

export default Redirections;
