import React from "react";

const EditableRow = ({ ...props }) => {
  return (
    <tr {...props} className="border border-red-800 redirection-table-row" />
  );
};

export default EditableRow;
