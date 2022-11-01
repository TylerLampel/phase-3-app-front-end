import React, { useState, useEffect } from "react";
import Task from "./Task";

function List({ list, onDeleteList }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/lists/${list.id}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div>
      <div>
        {tasks.map((task) => {
          return <Task task={task} key={task.id} />;
        })}
      </div>
    </div>
  );
}

export default List;
