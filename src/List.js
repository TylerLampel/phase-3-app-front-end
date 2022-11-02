import React, { useState, useEffect } from "react";
import Task from "./Task";

function List({ tasks }) {
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
