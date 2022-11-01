import React, { useState, useEffect } from "react";
import List from "./List";

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
      <div>
        {lists.map((list) => {
          return <List list={list} key={list.id} onDeleteList={onDeleteList} />;
        })}
      </div>
    </div>
  );
}

export default ListContainer;
