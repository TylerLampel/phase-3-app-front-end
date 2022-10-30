import React, { useState, useEffect } from "react";
import Task from "./Task";

function TaskContainer({ id }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  return (
    <div>
      {tasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </div>
  );
}

export default TaskContainer;
