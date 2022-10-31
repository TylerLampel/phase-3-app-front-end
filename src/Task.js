import React, { useState } from "react";

function Task({ task }) {
  const [isComplete, setIsComplete] = useState(false);

  function handleChange() {
    setIsComplete(!isComplete);
  }

  return (
    <div>
      {task.name}
      <button onClick={() => handleChange()}>{isComplete ? "✅" : "⭕"}</button>
    </div>
  );
}

export default Task;
