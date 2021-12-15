import React from "react";

const SideMenu = ({ children }) => {
  const SIDE_MENU_STYLE = { width: "384px", backgroundColor: "white" };

  return (
    <div className="border-r neeto-ui-menubar__wrapper" style={SIDE_MENU_STYLE}>
      <div
        className="space-y-4 neeto-ui-menubar__container"
        style={SIDE_MENU_STYLE}
      >
        {children}
      </div>
    </div>
  );
};

export default SideMenu;
