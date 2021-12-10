import React from "react";

import SideMenu from "components/Common/SideMenu";
import NavBar from "components/Public/Menu/NavBar";

const Container = ({ children, setLoading }) => {
  return (
    <div className="flex w-screen">
      <SideMenu>
        <NavBar setLoading={setLoading} />
      </SideMenu>
      <div className="flex w-full p-8">{children}</div>
    </div>
  );
};

export default Container;
