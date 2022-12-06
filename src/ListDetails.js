import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ListContext } from "./ListContext";

function ListDetails() {
  const { list_id } = useParams();
  const { lists, setLists } = useContext(ListContext);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [editListFormData, setEditListFormData] = useState("");
  const [showForm, setShowForm] = useState(false);

  let list = lists.find((list) => list.id === parseInt(list_id));

  const renderedTasks = list.tasks.map((task, index) => (
    <Card
      key={index}
      className="tasks"
      variant="outlined"
      sx={{ maxWidth: 360 }}
    >
      <CardContent>
        <TaskCard
          task={task}
          setLists={setLists}
          handleDeleteTaskClick={handleDeleteTaskClick}
        />
      </CardContent>
    </Card>
  ));

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
      .then((newLists) => setLists(newLists));
    setNewTaskInput("");
  }

  function handleDeleteTaskClick(task_id) {
    fetch(`http://localhost:9292/lists/${list_id}/tasks/${task_id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((updatedList) => setLists(updatedList));
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
        setLists(updatedList);
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
      {renderedTasks}
    </div>
  );
}
export default ListDetails;
