import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebaseConfig";

const InputTodo = () => {
  const [todoForm, setTodoForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description } = todoForm;

    if (title != "" && description !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        description,
        completed: false,
      });
      setTodoForm({
        title: "",
        description: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTodoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={todoForm.title}
          placeholder="Enter task title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={todoForm.description}
          placeholder="Enter task here...."
          onChange={handleChange}
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default InputTodo;
