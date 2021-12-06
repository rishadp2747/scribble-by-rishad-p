import React from "react";

import NavBar from "./NavBar";

import SideMenu from "../Common/SideMenu";

const Container = ({ children }) => {
  return (
    <div className="flex w-screen">
      <SideMenu>
        <NavBar />
      </SideMenu>
      <div className="flex w-full">{children}</div>
    </div>
  );
};

export default Container;
