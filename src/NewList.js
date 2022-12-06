import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { ListContext } from "./ListContext";

function NewList() {
  const { setLists } = useContext(ListContext);
  const [name, setName] = useState("");
  let navigate = useNavigate();

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
      .then(setLists);
    navigate("/lists");
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
        <Button
          size="small"
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
        >
          Create List
        </Button>
      </form>
    </div>
  );
}

export default NewList;
