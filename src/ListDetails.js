import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

function ListDetails() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { list_id } = useParams();
  const [newTaskInput, setNewTaskInput] = useState("");
  const [editListFormData, setEditListFormData] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9292/lists/${list_id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setList(data);
      });
  }, []);

  function handleChange(e) {
    setNewTaskInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/tasks/${list_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newTaskInput,
        completed: false,
        list_id: list_id,
      }),
    })
      .then((res) => res.json())
      .then((newLists) => setList(newLists));
    setNewTaskInput("");
  }

  function handleDeleteTaskClick(task_id) {
    fetch(`http://localhost:9292/lists/${list_id}/tasks/${task_id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((updatedList) => setList(updatedList));
  }

  function handleListSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/lists/${list_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editListFormData,
      }),
    })
      .then((res) => res.json())
      .then((updatedList) => {
        setList(updatedList);
        setEditListFormData("");
        setShowForm();
      });
  }

  function handleListChange(e) {
    setEditListFormData(e.target.value);
  }

  function onToggleFormClick() {
    setShowForm(!showForm);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h3>
          {list.name}
          {showForm ? (
            <form onSubmit={handleListSubmit}>
              <input
                type="text"
                placeholder="Edit List"
                onChange={handleListChange}
                value={editListFormData}
              ></input>
              <Button
                variant="outlined"
                type="submit"
                size="small"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </form>
          ) : (
            <Button variant="outlined" size="small" onClick={onToggleFormClick}>
              Edit
            </Button>
          )}
        </h3>
        <form onSubmit={handleSubmit}>
          <label>New Task</label>
          <input
            type="text"
            value={newTaskInput}
            onChange={handleChange}
            placeholder="Create New Task"
          ></input>
          <Button
            size="small"
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </form>
        <br />
        {list.tasks.map((task, index) => (
          <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <CardContent>
              <TaskCard
                key={index}
                task={task}
                list_id={list.id}
                setList={setList}
                handleDeleteTaskClick={handleDeleteTaskClick}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}
export default ListDetails;
