import { useState } from "react";
import TodoItem from "../Components/todoItem";
import styled from "styled-components";

const Title = styled.p`
  font-size: 50px;
  font-weight: bold;
`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;


export default function TodoListPage() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");


  const addTodo = () => {
    if (input == "")
      alert("글자를 입력하세요");
    else
      setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const modifyTodo = (index: number) => {
    todos.splice(index, 1, ""); 
    setTodos([...todos]);
    
  }

  const endModify = (index: number)=> 
  {
    const todo_temp = document.getElementsByClassName("modifyInput");
    const newValues: string[] = [];
    
    // todo_temp를 순회하며 값을 가져와서 배열에 추가
    for (let i = 0; i < todo_temp.length; i++) {
      const inputValue = (todo_temp[i] as HTMLInputElement).value;
      newValues.push(inputValue);
    }
    
    // index 위치의 값을 새로운 값(newValues)으로 대체
    todos.splice(index, 1, ...newValues);
        setTodos([...todos]);
  }



  return (
    <div>
      <Title>Todo List</Title>
      <div style={{ display: "flex", gap: "20px" }}>
        <input
          className = 'addInput'
          type='text'
          value={input}
          placeholder={`현재 ${todos.length}개`}
          onSubmit={addTodo}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <TodoList>
        {todos.map((todo, i) => (
          <TodoItem key={i} todo={todo} 
           onDelete={() => deleteTodo(i)}
           onModify = {() => modifyTodo(i)} 
           endModify = {() => endModify(i)}
           beingModified = { todo == "" ? true : false }
          />
        ))}
      </TodoList>
    </div>
  );
}
