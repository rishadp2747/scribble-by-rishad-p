import React from "react";

import NavBar from "./NavBar";

import SideMenu from "../Common/SideMenu";

const Container = ({ children }) => {
  return (
    <>
      <SideMenu>
        <NavBar />
      </SideMenu>
      <div className="flex">{children}</div>
    </>
  );
};

export default Container;
