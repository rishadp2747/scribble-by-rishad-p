import React from "react";

import { Typography } from "neetoui";

const Header = ({ title, subTitle }) => {
  return (
    <div>
      <Typography style="h2">{title}</Typography>
      <Typography style="body1">{subTitle}</Typography>
    </div>
  );
};

export default Header;
