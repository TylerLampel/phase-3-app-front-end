import React from "react";
import Task from "./Task";

function List({ list, tasks, onDeleteList }) {
  function handleDeleteClick() {
    fetch(`http://localhost:9292/lists/${list.id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((deletedList) => onDeleteList(deletedList));
  }
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
