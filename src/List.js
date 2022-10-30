import React from "react";
import TaskContainer from "./TaskContainer";

function List({ list }) {
  return (
    <div>
      <h2>{list.name}</h2>
      <div>
        <TaskContainer id={list.id} />
      </div>
    </div>
  );
}

export default List;
