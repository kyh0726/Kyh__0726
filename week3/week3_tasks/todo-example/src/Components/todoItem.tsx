import { useState } from "react";
import TodoListPage from "../Pages/todoListPage"

interface TodoItemProps {
  todo: string;
  onDelete: () => void;
  onModify: () => void;
  endModify: () => void;
  beingModified : boolean;
}



export default function TodoItem({ todo, onDelete, onModify, endModify, beingModified }: TodoItemProps) {
  
  const [modifyInput, modifySetInput] = useState(todo);

  return (
    beingModified == true 
    ?  // 수정 중일 때
    <li
      style={{
      display: "flex",
      justifyContent: "space-between",
      border: "1px solid black",
    }}
  >
    <input
      className = 'modifyInput'
      type = "text"
      value = {modifyInput}
      onSubmit={endModify}
      onChange={(e) => modifySetInput(e.target.value)}
      >
       </input>
    <button onClick={onDelete}> 삭제 </button>
    <button onClick={endModify}> 확인 </button>
  </li>
    : // 수정 중이지 않을 때
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid black",
      }}
    >
      {todo}
      <button onClick={onDelete}> 삭제 </button>
      <button onClick={onModify}> 수정 </button>
    </li>
  );
}

export const getInternalValue = (): string => {
  const internalValue = 'sd';
  return internalValue;
};

