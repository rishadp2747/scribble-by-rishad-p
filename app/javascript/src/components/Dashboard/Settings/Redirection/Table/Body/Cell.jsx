import React from "react";

import { Label } from "neetoui";
import { Input } from "neetoui/formik";

const Cell = ({ editing, dataIndex, children, ...otherProps }) => {
  let childNode = children;

  const domain = window.location.hostname;
  const port = window.location.port;
  const isDefaultPort = port === 80;

  if (editing) {
    childNode = <Input name={dataIndex} type="text" />;
  }

  return (
    <td {...otherProps}>
      <div className={"flex truncate"}>
        {dataIndex === "from_path" && (
          <Label>
            https://{domain}:{!isDefaultPort && port}
          </Label>
        )}
        {childNode}
      </div>
    </td>
  );
};

export default Cell;
