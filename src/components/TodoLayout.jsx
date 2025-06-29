import React, { useCallback, useEffect, useState } from "react";
import TodoForm from "./todoForm/todoForm";
import TodoList from "./todoList/TodoList";

import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

const TodoLayout = () => {
  const [todoList, setTodoList] = useState([]);

  console.log("todoList", todoList);

  useEffect(() => {
    const todoCollection = collection(db, "todos");

    const unsubscribe = onSnapshot(todoCollection, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodoList(todosData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      toast.success("Deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.success("Failed to delete Task!");
    }
  }, []);

  const handleEditSave = useCallback(async (id, updatedTodo) => {
    const todoRef = doc(db, "todos", id);
    try {
      await updateDoc(todoRef, updatedTodo);
      toast.success("Task Updated");
    } catch (error) {
      console.error(error);
      toast.success("Failed to update Task");
    }
  }, []);

  const handleComplete = useCallback(async (id) => {
    const docRef = doc(db, "todos", id);
    try {
      await updateDoc(docRef, { completed: true });
      toast.success("Task Completed");
    } catch (error) {
      console.error(error);
      toast.success("Failed to Update Task Completed");
    }
  }, []);

  return (
    <>
      <div className="py-5 px-5 overflow-x-hidden">
        <div className="container mx-auto">
          <TodoForm />
          <TodoList
            todoList={todoList}
            handleDelete={handleDelete}
            handleEditSave={handleEditSave}
            handleComplete={handleComplete}
          />
        </div>
      </div>
    </>
  );
};

export default TodoLayout;
