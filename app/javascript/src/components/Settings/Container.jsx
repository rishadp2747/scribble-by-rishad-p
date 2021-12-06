import React from "react";

import NavBar from "./NavBar";

import SideMenu from "../Common/SideMenu";

const Container = ({ children }) => {
  return (
    <div className="flex w-screen">
      <SideMenu>
        <NavBar />
      </SideMenu>
      <div className="flex w-full">
        <div className="flex justify-center w-full py-8">
          <div className="flex flex-col w-2/3 h-full space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Container;
