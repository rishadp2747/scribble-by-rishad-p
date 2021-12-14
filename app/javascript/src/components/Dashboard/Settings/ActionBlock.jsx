import React from "react";

import { Delete, Highlight, Check } from "neetoicon";
import { Button } from "neetoui";

const ActionBlock = ({
  record,
  editingRecord = {},
  handleEditRecord,
  handleDeleteRecord,
}) => {
  const isRecordEditing = editingRecord.id === record.id;

  let actions = (
    <>
      <Button
        style="text"
        icon={() => (
          <Delete size={16} onClick={() => handleDeleteRecord(record)} />
        )}
      />
      <Button
        style="text"
        icon={() => <Highlight size={16} />}
        onClick={() => handleEditRecord(record)}
      />
    </>
  );

  if (isRecordEditing) {
    actions = (
      <Button type="submit" style="text" icon={() => <Check size={16} />} />
    );
  }

  return (
    <div className="flex flex-row justify-end w-full space-x-6">{actions}</div>
  );
};

export default ActionBlock;
