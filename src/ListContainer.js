import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";

function ListContainer() {
  const [lists, setLists] = useState([]);
  const [newListInput, setNewListInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292/lists")
      .then((res) => res.json())
      .then((data) => setLists(data));
  }, []);

  function handleChange(e) {
    setNewListInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9292/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newListInput,
      }),
    })
      .then((res) => res.json())
      .then((newList) => addNewList(newList));
    setNewListInput("");
  }

  function addNewList(newListInput) {
    let listsCopy = [...lists];
    listsCopy = [...listsCopy, newListInput];
    setLists(listsCopy);
  }

  function handleDeleteListClick(id) {
    fetch(`http://localhost:9292/lists/${id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((deletedList) => onDeleteList(deletedList));
  }

  function onDeleteList(deletedList) {
    const updatedLists = lists.filter((list) => list.id !== deletedList.id);
    setLists(updatedLists);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={newListInput}
          onChange={handleChange}
          type="text"
          placeholder="New List"
        ></input>
        <button>Create New List</button>
      </form>
      {lists.map((list) => {
        return (
          <div key={list.id}>
            <Link to={`/lists/${list.id}`}>
              <h2>{list.name}</h2>
            </Link>
            <button onClick={() => handleDeleteListClick(list.id)}>
              Delete 🗑
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ListContainer;
