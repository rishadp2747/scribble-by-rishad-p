import React, { useState } from "react";

import { Plus, Search, Highlight, Delete } from "neetoicon";
import { Typography, Dropdown, Button, Input, Checkbox, Table } from "neetoui";
import {
  MenuBar,
  Scrollable,
  Container as PageContainer,
} from "neetoui/layouts";

import Container from "components/Common/Container";
import { DEFAULT_TABLE_COLUMNS } from "components/Dashboard/constant";

import CategoryMenu from "./CategoryMenu";

const DataActions = () => {
  return (
    <div className="flex flex-row space-x-4">
      <Delete size={16} />
      <Highlight size={16} />
    </div>
  );
};

const Dashboard = ({ setLoading, loading }) => {
  const [tableColumns, setTableColumns] = useState(DEFAULT_TABLE_COLUMNS);

  const CUSTOM_TABLE_COLUMNS = tableColumns
    .filter(({ show }) => show)
    .map(({ data }) => data);

  const TABLE_COLUMNS = [
    ...CUSTOM_TABLE_COLUMNS,
    {
      dataIndex: "edit",
      key: "edit",
      render: () => <DataActions />,
      width: 20,
    },
  ];

  const TABLE_DATA = [
    {
      title: "Welcome to Scribble",
      date: "October 9th, 2022",
      author: "Oliver Smith",
      status: "Published",
      category: "Getting Started",
    },
    {
      title: "Welcome to Scribble",
      date: "October 9th, 2022",
      author: "Oliver Smith",
      status: "Published",
      category: "Getting Started",
    },
  ];

  const handleColumnChange = e => {
    setTableColumns(
      tableColumns.map(column => {
        if (column.data.key === e.target.id) {
          column.show = !column.show;
        }

        return column;
      })
    );
  };

  return (
    <Container loading={loading}>
      <div className="flex w-screen">
        <MenuBar showMenu={true} title="Articles">
          <MenuBar.Block label="All" count={67} active />
          <MenuBar.Block label="Draft" count={15} />
          <MenuBar.Block label="Published" count={52} />

          <CategoryMenu setLoading={setLoading} />
        </MenuBar>
        <PageContainer>
          <div className="flex flex-col w-full py-4">
            <div className="flex flex-row w-4/5 h-8 ml-auto space-x-3">
              <Input
                size="small"
                prefix={<Search size={20} />}
                placeholder="Search article title"
              />
              <Dropdown
                closeOnSelect={false}
                label="Columns"
                buttonStyle="text"
                position="bottom-end"
                className="h-8 bg-gray-200 border"
              >
                <div className="p-4 space-y-4">
                  <Typography style="h5">Columns</Typography>
                  {DEFAULT_TABLE_COLUMNS.map(({ show, data }, index) => (
                    <Checkbox
                      checked={show}
                      key={index}
                      label={data.title}
                      id={data.key}
                      onChange={handleColumnChange}
                    />
                  ))}
                </div>
              </Dropdown>
              <Button
                icon={Plus}
                iconPosition="right"
                label="Add New Article"
                className="bg-indigo-500"
              />
            </div>

            <Typography style="h4" className="py-4">
              {TABLE_DATA?.length} Articles
            </Typography>

            <Scrollable>
              <Table
                rowSelection={false}
                columnData={TABLE_COLUMNS}
                rowData={TABLE_DATA}
                className="border border-red-500 "
              />
            </Scrollable>
          </div>
        </PageContainer>
      </div>
    </Container>
  );
};

export default Dashboard;
