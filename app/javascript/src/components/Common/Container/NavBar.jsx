import React from "react";

import { Typography } from "neetoui";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex flex-row space-x-6 text-gray-400">
      <NavLink to="/dashboard" activeClassName="text-indigo-500">
        <Typography style="h4">Articles</Typography>
      </NavLink>
      <NavLink to="/settings/" activeClassName="text-indigo-500">
        <Typography style="h4">Settings</Typography>
      </NavLink>
    </div>
  );
};

export default NavBar;
