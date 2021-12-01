import React from "react";

import { Plus, Search } from "neetoicon";
import { Typography, Dropdown, Button, Input, Checkbox } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import Container from "components/Common/Container";

const Dashboard = () => {
  const ACTION_ICONS = [
    {
      icon: Search,
    },
    {
      icon: Plus,
    },
  ];

  const TABLE_COLUMNS = ["Title", "Categories", "Date", "Author", "Status"];

  return (
    <Container>
      <div className="flex">
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
        <div className="flex flex-col w-full p-4 border border-green-500">
          <div className="flex flex-row w-4/5 h-8 ml-auto space-x-3">
            <Input
              size="small"
              prefix={<Search size={20} />}
              placeholder="Search article title"
            />
            <Dropdown
              label="Columns"
              buttonStyle="text"
              position="bottom-end"
              className="h-8 bg-gray-200 border"
            >
              <div className="p-4 space-y-4">
                <Typography style="h5">Columns</Typography>
                {TABLE_COLUMNS.map((column, index) => (
                  <Checkbox
                    checked
                    key={index}
                    label={column}
                    id={column.toLocaleLowerCase()}
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
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
