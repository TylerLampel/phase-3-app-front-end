import React from "react";
import Task from "./Task";

function List({ list }) {
  return (
    <div>
      <h2>{list.name}</h2>
      <div>
        {list.tasks.map((task) => {
          return <Task task={task} key={task.id} />;
        })}
      </div>
    </div>
  );
}

export default List;
