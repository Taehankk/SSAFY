import { useState } from "react";
import { ToDoInput } from "../ToDoInput/indes";
import { ShowInputButton } from "../ShowInputButton";

interface Props {
    readonly onAdd: (toDo: string) => void;
}

export const InputContainer = ({ onAdd }: Props) => {
    const [showToDoInput, setShowToDoInput] = useState(false);

    const onAddTodo = (toDo: string) => {
        onAdd(toDo);
        setShowToDoInput(false);
    };

    return (
        <>
            {showToDoInput && <ToDoInput onAdd={onAddTodo} />}
            <ShowInputButton show={showToDoInput} onClick={() => setShowToDoInput(!showToDoInput)} />
        </>
    );
};
