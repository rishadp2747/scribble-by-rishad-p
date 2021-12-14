import React from "react";

import SideMenu from "components/Common/SideMenu";
import NavBar from "components/Public/Menu/NavBar";

const Container = ({ children, setLoading, slug }) => {
  return (
    <div className="flex w-screen">
      <SideMenu>
        <NavBar setLoading={setLoading} slug={slug} />
      </SideMenu>
      <div className="flex w-full p-8">{children}</div>
    </div>
  );
};

export default Container;
