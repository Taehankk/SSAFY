import { useState } from "react";
import { ToDoInput } from "../../pages/ToDoInput";
import { ShowInputButton } from "../ShowInputButton";

export const InputContainer = () => {
  const [showToDoInput, setShowToDoInput] = useState(false);

  const onClose = () => {
    setShowToDoInput(false);
  };

  return (
    <>
      {showToDoInput && <ToDoInput />}
      <ShowInputButton
        show={showToDoInput}
        onClick={() => setShowToDoInput(!showToDoInput)}
      />
    </>
  );
};
