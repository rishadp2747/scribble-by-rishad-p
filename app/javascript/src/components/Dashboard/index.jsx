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

const DataActions = () => {
  return (
    <div className="flex flex-row space-x-4">
      <Delete size={16} />
      <Highlight size={16} />
    </div>
  );
};

const Dashboard = () => {
  const [tableColumns, setTableColumns] = useState(DEFAULT_TABLE_COLUMNS);

  const ACTION_ICONS = [
    {
      icon: Search,
    },
    {
      icon: Plus,
    },
  ];

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

  const data = [
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
    <Container>
      <div className="flex w-screen">
        <MenuBar showMenu={true} title="Articles">
          <MenuBar.Block label="All" count={67} active />
          <MenuBar.Block label="Draft" count={15} />
          <MenuBar.Block label="Published" count={52} />

          <MenuBar.SubTitle iconProps={ACTION_ICONS}>
            <Typography
              component="h4"
              style="h5"
              textTransform="uppercase"
              weight="bold"
            >
              Categories
            </Typography>
          </MenuBar.SubTitle>

          <MenuBar.Block label="Getting Started" count={80} />
          <MenuBar.Block label="Apps & Integration" count={60} />
          <MenuBar.Block label="Security & Privacy" count={60} />
          <MenuBar.Block label="Misc" count={60} />
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
              67 Articles
            </Typography>

            <Scrollable>
              <Table
                rowSelection={false}
                columnData={TABLE_COLUMNS}
                rowData={data}
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
