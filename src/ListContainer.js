import React, { useState, useEffect } from "react";
import List from "./List";
import { Route, Link } from "react-router-dom";

function ListContainer() {
  const [lists, setLists] = useState([]);
  const [newListInput, setNewListInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292/lists")
      .then((res) => res.json())
      .then(setLists);
  }, []);

  function onDeleteList(deletedList) {
    const updatedLists = lists.filter((list) => list.id !== deletedList.id);
    setLists(updatedLists);
  }

  function handleDeleteClick() {
    fetch(`http://localhost:9292/lists`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((deletedList) => onDeleteList(deletedList));
  }

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
          <div>
            <Link to={`/lists/${list.id}`}>{list.name}</Link>
            <button onClick={() => handleDeleteClick()}>Delete 🗑</button>
            <Route exact path={`/lists/${list.id}/`}>
              <List
                list={list}
                key={list.id}
                tasks={list.tasks}
                onDeleteList={onDeleteList}
              />
            </Route>
          </div>
          // make each list have its own page where url is the id of the list
        );
      })}
    </div>
  );
}

export default ListContainer;
