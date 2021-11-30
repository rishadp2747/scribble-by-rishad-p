import React from "react";

import { Plus, Search } from "neetoicon";
import { Typography, Dropdown, Button, Input } from "neetoui";
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
        <div className="flex flex-col w-full p-4">
          <div className="flex flex-row w-2/3 ml-auto space-x-4">
            <Input
              size="small"
              prefix={<Search size={20} />}
              placeholder="Search article title"
            />
            <Dropdown
              buttonStyle="secondary"
              label="Columns"
              position="bottom-end"
            >
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </Dropdown>
            <Button
              icon={Plus}
              iconPosition="right"
              label="Add New Article"
              className="bg-indigo-500"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
