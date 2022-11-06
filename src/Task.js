import React, { useState } from "react";

function Task({ task, handleDeleteTaskClick }) {
  const [isComplete, setIsComplete] = useState(false);

  function handleChange() {
    setIsComplete(!isComplete);
  }

  return (
    <div>
      {task.name}
      <button onClick={() => handleChange()}>{isComplete ? "✅" : "⭕"}</button>
      <button onClick={() => handleDeleteTaskClick(task.id)}>Delete 🗑</button>
    </div>
  );
}

export default Task;
