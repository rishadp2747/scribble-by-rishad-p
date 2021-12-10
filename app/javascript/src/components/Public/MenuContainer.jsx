import React from "react";

import SideMenu from "components/Common/SideMenu";
import MenuBar from "components/Public/MenuBar";

const MenuContainer = ({ children, setLoading }) => {
  return (
    <div className="flex w-screen">
      <SideMenu>
        <MenuBar setLoading={setLoading} />
      </SideMenu>
      <div className="flex w-full p-8">{children}</div>
    </div>
  );
};

export default MenuContainer;
