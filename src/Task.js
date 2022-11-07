import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Task({ task, handleDeleteTaskClick, onUpdateTask }) {
  const { id } = useParams();
  const [isComplete, setIsComplete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editFormData, setEditFormData] = useState("");

  function handleChange() {
    setIsComplete(!isComplete);
  }

  function onToggleFormClick() {
    setShowForm(!showForm);
  }

  function handleChange(e) {
    setEditFormData(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editFormData,
      }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        onUpdateTask(updatedTask);
        setEditFormData("");
        setShowForm();
      });
  }

  return (
    <div>
      {task.name}
      <button onClick={() => handleChange()}>{isComplete ? "✅" : "⭕"}</button>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Edit Task"
            onChange={handleChange}
            value={editFormData}
          ></input>
          <button>Edit</button>
        </form>
      ) : (
        <button onClick={onToggleFormClick}>Edit</button>
      )}
      <button onClick={() => handleDeleteTaskClick(task.id)}>Delete 🗑</button>
    </div>
  );
}

export default Task;
