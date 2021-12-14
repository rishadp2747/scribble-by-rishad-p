import React from "react";

import { Label } from "neetoui";
import { Input } from "neetoui/formik";

const Cell = ({ editing, dataIndex, children, ...otherProps }) => {
  let childNode = children;

  if (editing) {
    childNode = <Input name={dataIndex} type="text" />;
  }

  return (
    <td {...otherProps}>
      <div className={"flex truncate"}>
        {dataIndex === "from_path" && <Label>https://scribble.com/</Label>}
        {childNode}
      </div>
    </td>
  );
};

export default Cell;
