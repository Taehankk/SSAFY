import { useContext } from "react";
import { ToDoListContext } from "../../../contexts/ToDoList";

import { ToDoList } from "../../templates/ToDoList";

export const ToDoListPage = () => {
    const { toDoList, onDelete } = useContext(ToDoListContext);

    // const toDoList = ["리액트 공부하기", "CDD 공부하기", "할 일 목록 앱 개발하기"];

    return <ToDoList toDoList={toDoList} onDelete={onDelete} />;
};
