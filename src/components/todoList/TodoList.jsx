import React, { useState, useRef, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaCheck, FaRegCheckCircle } from "react-icons/fa";

const TodoList = ({
  todoList,
  handleDelete,
  handleEditSave,
  handleComplete,
}) => {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
  });

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditForm({ title: todo.title, description: todo.description });
  };

  const handleSave = () => {
    handleEditSave(editId, editForm);
    setEditId(null);
    setEditForm({
      title: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (editId !== null) {
      if (titleRef.current) {
        titleRef.current.style.height = "auto";
        titleRef.current.style.height = titleRef.current.scrollHeight + "px";
      }
      if (descriptionRef.current) {
        descriptionRef.current.style.height = "auto";
        descriptionRef.current.style.height =
          descriptionRef.current.scrollHeight + "px";
      }
    }
  }, [editForm.description, editForm.title, editId]);

  return (
    <>
      {todoList.length > 0 ? (
        <div className="mx-auto w-full sm:w-3/4  py-10">
          <h2 className="text-2xl mb-10 text-center">My Daily Task</h2>
          <div className="">
            <ul>
              {todoList?.map(
                ({ id, title, description, completed, createdAt }, index) => {
                  const date = createdAt?.toDate?.();
                  const formattedDate = date
                    ? date.toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A";
                  console.log(date);
                  return (
                    <li key={id}>
                      <div className="flex items-center justify-between mb-3">
                        <h3>Task {index + 1}</h3>
                        <span className="text-xs">{formattedDate}</span>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border p-2 mb-10">
                        {editId === id ? (
                          <div className="flex flex-col items-start gap-2 w-full">
                            <textarea
                              ref={titleRef}
                              className="border resize-none w-full overflow-hidden p-2"
                              name="title"
                              type="text"
                              rows={1}
                              value={editForm.title}
                              onChange={handleChange}
                              onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height =
                                  e.target.scrollHeight + "px";
                              }}
                            />
                            <textarea
                              ref={descriptionRef}
                              className="border resize-none w-full overflow-hidden p-2"
                              name="description"
                              value={editForm.description}
                              onChange={handleChange}
                              rows={1}
                              onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height =
                                  e.target.scrollHeight + "px";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-full">
                            <h3 className="text-xl pb-3">{title}</h3>
                            <p>{description}</p>
                          </div>
                        )}
                        {editId === id ? (
                          <div className="flex items-center gap-2">
                            <button
                              className="bg-green-500 flex items-center gap-2 cursor-pointer border p-2"
                              onClick={handleSave}
                            >
                              Save
                            </button>
                            <button
                              className="bg-red-800 flex items-center gap-2 cursor-pointer border p-2"
                              onClick={() => setEditId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              className="flex items-center gap-2 cursor-pointer border p-2"
                              onClick={() =>
                                handleEdit({ id, title, description })
                              }
                              disabled={completed}
                            >
                              <FaEdit color="green" /> Edit
                            </button>
                            <button
                              className="flex items-center gap-2 cursor-pointer border p-2"
                              onClick={() => handleDelete(id)}
                            >
                              <FaTrash color="red" /> Delete
                            </button>
                            <button
                              className="flex items-center gap-2 cursor-pointer border p-2"
                              disabled={completed}
                              onClick={() => handleComplete(id)}
                            >
                              {completed ? (
                                <>
                                  <FaCheck className="text-green-600" />{" "}
                                  <span>Completed</span>
                                </>
                              ) : (
                                <>
                                  <FaRegCheckCircle className="text-gray-600" />{" "}
                                  <span> Complete </span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-10 py-15 px-5">
          <FaClipboardList fontSize={80} />
          <p> No To-Do List Found</p>
        </div>
      )}
    </>
  );
};

export default TodoList;
