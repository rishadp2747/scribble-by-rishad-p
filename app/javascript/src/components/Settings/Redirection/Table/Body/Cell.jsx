import React from "react";

import { Label } from "neetoui";
import { Input } from "neetoui/formik";

const Cell = ({ editing, dataIndex, children, ...restProps }) => {
  let childNode = children;

  if (editing) {
    childNode = <Input name={dataIndex} type="text" />;
  }

  return (
    <td {...restProps}>
      <div className="flex">
        {dataIndex === "from_path" && <Label>https://scribble.com/</Label>}
        {childNode}
      </div>
    </td>
  );
};

export default Cell;
