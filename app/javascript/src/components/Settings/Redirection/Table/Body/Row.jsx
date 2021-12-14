import React from "react";

const Row = ({ ...props }) => {
  return (
    <tr {...props} className="border border-red-800 redirection-table-row" />
  );
};

export default Row;
