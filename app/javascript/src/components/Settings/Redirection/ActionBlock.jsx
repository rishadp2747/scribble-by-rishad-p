import React from "react";

import { Delete, Highlight } from "neetoicon";
import { Button } from "neetoui";

const ActionBlock = ({ record, handleRecordEdit, handleRecordDelete }) => {
  return (
    <div className="flex flex-row justify-end space-x-6">
      <Button
        style="text"
        icon={() => (
          <Delete size={16} onClick={() => handleRecordDelete(record)} />
        )}
      />
      <Button
        style="text"
        icon={() => <Highlight size={16} />}
        onClick={() => handleRecordEdit(record)}
      />
    </div>
  );
};

export default ActionBlock;
