import React from "react";

import { Check } from "neetoicon";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

const EditableCell = ({ editing, children, ...restProps }) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Input
          name="editCategory.title"
          type="text"
          suffix={
            <Button
              type="submit"
              style="text"
              className="input-suffix-button"
              icon={() => <Check className="cursor-pointer" />}
            />
          }
        />
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
