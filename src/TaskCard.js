import React, { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import SendIcon from "@mui/icons-material/Send";

// update task

function TaskCard({ task, setLists, handleDeleteTaskClick }) {
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
    fetch(`http://localhost:9292/tasks/${task.id}`, {
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
        setLists(updatedList);
        setEditFormData("");
        setShowForm();
      });
  }

  return (
    <div>
      {task.name}
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        size="small"
      >
        <Button onClick={() => handleComplete()}>
          {isComplete ? "✅" : "⭕"}
        </Button>
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Edit Task"
              onChange={handleChange}
              value={editFormData}
            ></input>
            <Button type="submit" endIcon={<SendIcon />}>
              Send
            </Button>
          </form>
        ) : (
          <Button onClick={onToggleFormClick}>Edit</Button>
        )}
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteTaskClick(task.id)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default TaskCard;
