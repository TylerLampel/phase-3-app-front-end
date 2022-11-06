import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Task from "./Task";

function List() {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:9292/lists/${id}`),
      fetch(`http://localhost:9292/lists/${id}/tasks`),
    ])
      .then(([resList, resTasks]) =>
        Promise.all([resList.json(), resTasks.json()])
      )
      .then(([dataList, dataTasks]) => {
        setList(dataList);
        setTasks(dataTasks);
      });
  }, []);

  const renderedTasks = tasks.map((task) => <Task key={task.id} task={task} />);

  function handleChange(e) {
    setNewTaskInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9292/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newTaskInput,
        completed: false,
        list_id: id,
      }),
    })
      .then((res) => res.json())
      .then((newTask) => addNewTask(newTask));
    setNewTaskInput("");
  }

  function addNewTask(newTask) {
    let tasksCopy = [...tasks];
    tasksCopy = [...tasksCopy, newTask];
    setTasks(tasksCopy);
  }

  return (
    <div>
      <h2>{list.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={newTaskInput}
          onChange={handleChange}
          type="text"
          placeholder="New Task"
        ></input>
        <button>Create New Task</button>
      </form>
      {renderedTasks}
    </div>
  );
}

export default List;
