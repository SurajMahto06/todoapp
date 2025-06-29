import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";

const TodoForm = () => {
  const [todoForm, setTodoForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description } = todoForm;
    if (title.trim() !== "" && description.trim() !== "") {
      try {
        await addDoc(collection(db, "todos"), {
          title,
          description,
          completed: false,
        });
        toast.success("Task added successfully! ✅");

        setTodoForm({
          title: "",
          description: "",
        });
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Failed to add task ❌");
      }
    } else {
      toast.warning("Please fill in all fields ⚠️");
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto w-full sm:w-3/4 md:w-1/2 ">
          <input
            className="border p-2 w-full mb-5"
            type="text"
            placeholder="Task Title"
            name="title"
            value={todoForm.title}
            onChange={handleChange}
          />
          <textarea
            className="border p-2 w-full mb-5"
            type="text"
            placeholder="Write Task here..."
            rows={5}
            name="description"
            value={todoForm.description}
            onChange={handleChange}
          />
          <button className="cursor-pointer border p-2" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
