import React from "react";

import { Delete, Highlight, Check } from "neetoicon";
import { Button } from "neetoui";

const ActionBlock = ({ record, isRecordEditing, editRecordHandler }) => {
  return (
    <div className="flex flex-row justify-end space-x-6">
      {isRecordEditing ? (
        <Button
          type="submit"
          style="text"
          icon={() => <Check size={16} />}
          onClick={() => editRecordHandler(record)}
        />
      ) : (
        <>
          <Button style="text" icon={() => <Delete size={16} />} />

          <Button
            style="text"
            icon={() => <Highlight size={16} />}
            onClick={() => editRecordHandler(record)}
          />
        </>
      )}
    </div>
  );
};

export default ActionBlock;
