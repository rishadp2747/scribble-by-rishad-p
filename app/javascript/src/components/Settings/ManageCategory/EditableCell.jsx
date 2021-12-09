import React from "react";

import { Check } from "neetoicon";
import { Button, Input } from "neetoui";

const EditableCell = ({
  isRecordEditing,
  editCategory,
  handleEditCategoryValue,
  handleSubmitEditCategory,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {isRecordEditing ? (
        <Input
          type="text"
          autoFocus="autoFocus"
          value={editCategory.value.title}
          onChange={handleEditCategoryValue}
          error={editCategory.error}
          suffix={
            <Button
              type="submit"
              style="text"
              className="input-suffix-button"
              icon={() => (
                <Check
                  className="cursor-pointer"
                  onClick={handleSubmitEditCategory}
                />
              )}
            />
          }
        />
      ) : (
        children
      )}
    </td>
  );
};

export default React.memo(EditableCell);
