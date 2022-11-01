import React, { useState, useEffect } from "react";
import Task from "./Task";

function List({ list, onDeleteList }) {
  const [tasks, setTasks] = useState([]);

  function handleDeleteClick() {
    fetch(`http://localhost:9292/lists/${list.id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((deletedList) => onDeleteList(deletedList));
  }

  useEffect(() => {
    fetch(`http://localhost:9292/lists/${list.id}/tasks`)
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  return (
    <div>
      <div>
        <h2>
          {list.name}
          <button onClick={() => handleDeleteClick()}>Delete 🗑</button>
        </h2>
      </div>
      <div>
        {tasks.map((task) => {
          return <Task task={task} key={task.id} />;
        })}
      </div>
    </div>
  );
}

export default List;
