import React from "react";

const TodoList = ({ todo }) => {
  console.log(todo);
  return (
    <li key={todo.id}>
      {todo.title} - {todo.completed ? "✅" : "❌"}
    </li>
  );
};

export default TodoList;
