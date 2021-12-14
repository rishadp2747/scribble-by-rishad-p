import React from "react";

const Cell = ({ ...props }) => {
  return <th {...props} className="bg-indigo-50" />;
};

export default Cell;
