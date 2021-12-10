import React from "react";

import classnames from "classnames";
import { Typography } from "neetoui";
import PropTypes from "prop-types";

const Header = ({ title, navLinks, actionBlock, titlePosition = "left" }) => {
  return (
    <div className="relative z-50 flex flex-row items-center h-16 p-6 shadow">
      <div
        className={classnames("flex flex-row space-x-6", {
          "justify-center w-full": titlePosition === "center",
        })}
      >
        <Typography style="h4" className="capitalize">
          {title}
        </Typography>
        {titlePosition === "left" && navLinks}
      </div>
      <div className="ml-auto">{titlePosition === "left" && actionBlock}</div>
    </div>
  );
};

Header.prototype = {
  title: PropTypes.string,
  titlePosition: PropTypes.oneOf(["left", "center"]),
  navLinks: PropTypes.node,
  actionBlock: PropTypes.node,
};

export default Header;
