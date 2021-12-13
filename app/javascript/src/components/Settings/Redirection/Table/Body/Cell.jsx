import React from "react";

import { Input } from "neetoui/formik";

const EditableCell = ({ editing, dataIndex, children, ...restProps }) => {
  return (
    <td {...restProps}>
      {editing ? <Input name={dataIndex} type="text" /> : children}
    </td>
  );
};

export default EditableCell;
