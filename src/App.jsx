import "./App.css";
import React from "react";
import Header from "./components/header/Header";
import TodoLayout from "./components/TodoLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <TodoLayout />
      <ToastContainer />
    </>
  );
}

export default App;
