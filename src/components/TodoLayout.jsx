import React from "react";
import TodoForm from "./todoForm/todoForm";

const TodoLayout = () => {
  return (
    <>
      <div className="py-10 px-5">
        <div className="container mx-auto">
          <TodoForm />
        </div>
      </div>
    </>
  );
};

export default TodoLayout;
