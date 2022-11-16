import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewList() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9292/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then(navigate("/lists"));
  }
  return (
    <div>
      <h2>Create New List</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChange}
            autoFocus={true}
          />
        </div>
        <br />
        <input type="submit" value="Create List" />
      </form>
    </div>
  );
}

export default NewList;
