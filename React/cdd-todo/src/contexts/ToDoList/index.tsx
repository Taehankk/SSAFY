import { createContext, useState } from "react";

interface Context {
    readonly toDoList: string[];
    readonly onAdd: (toDo: string) => void;
    readonly onDelete: (toDo: string) => void;
}

const ToDoListContext = createContext<Context>({
    toDoList: [],
    onAdd: (): void => {},
    onDelete: (): void => {},
});

interface Props {
    children: JSX.Element | JSX.Element[];
}

const ToDoListContextProvider = ({ children }: Props) => {
    const [toDoList, setToDoList] = useState(["리액트 공부하기", "CDD 공부하기", "할 일 목록 앱 개발하기"]);

    const onDelete = (todo: string) => {
        setToDoList(toDoList.filter((item) => item !== todo));
    };

    const onAdd = (toDo: string) => {
        setToDoList([...toDoList, toDo]);
    };

    // console.log(toDoList);

    return (
        <ToDoListContext.Provider
            value={{
                toDoList,
                onAdd,
                onDelete,
            }}
        >
            {children}
        </ToDoListContext.Provider>
    );
};

export { ToDoListContext, ToDoListContextProvider };
