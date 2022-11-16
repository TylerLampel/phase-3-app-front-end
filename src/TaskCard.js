import React, { useState } from "react";

// update task

function TaskCard({ task, list_id, setList, handleDeleteTaskClick }) {
  const [isComplete, setIsComplete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editFormData, setEditFormData] = useState("");

  function handleComplete() {
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
    fetch(`http://localhost:9292/lists/${list_id}/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editFormData,
      }),
    })
      .then((res) => res.json())
      .then((updatedList) => {
        setList(updatedList);
        setEditFormData("");
        setShowForm();
      });
  }

  return (
    <div>
      {task.name}
      <button onClick={() => handleComplete()}>
        {isComplete ? "✅" : "⭕"}
      </button>
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

export default TaskCard;
