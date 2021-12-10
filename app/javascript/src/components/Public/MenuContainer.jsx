import React from "react";

import SideMenu from "components/Common/SideMenu";
import MenuBar from "components/Public/MenuBar";

const MenuContainer = ({ children, setLoading }) => {
  return (
    <div className="flex w-screen">
      <SideMenu>
        <MenuBar setLoading={setLoading} />
      </SideMenu>
      <div className="flex w-full">
        <div className="flex justify-center w-full py-8">
          <div className="flex flex-col w-2/3 h-full space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuContainer;
