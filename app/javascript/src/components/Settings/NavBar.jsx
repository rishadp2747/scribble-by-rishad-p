import React from "react";

import { Settings, Repeat, Seo } from "neetoicon";
import { Typography } from "neetoui";
import { NavLink } from "react-router-dom";

const NAVLINKS = [
  {
    icon: <Settings />,
    title: "General",
    subTitle: "Page Title, Brand Name & Meta Description",
    link: "/settings/general",
  },
  {
    icon: <Repeat />,
    title: "Redirections",
    subTitle: "Create & configure redirection rules",
    link: "/settings/redirections",
  },
  {
    icon: <Seo />,
    title: "Manage categories",
    subTitle: "Edit and Reorder KB Structure",
    link: "/settings/categories",
  },
];

const NavBar = () =>
  NAVLINKS.map((navlink, index) => (
    <NavLink
      exact
      key={index}
      to={navlink.link}
      activeClassName="bg-indigo-100"
      className="flex flex-row items-center h-16 px-2 space-x-4"
    >
      {navlink.icon}
      <div className="flex flex-col">
        <Typography style="h4" className="text-gray-800">
          {navlink.title}
        </Typography>
        <Typography style="body3" className="text-gray-700">
          {navlink.subTitle}
        </Typography>
      </div>
    </NavLink>
  ));
export default NavBar;
