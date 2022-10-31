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

  return (
    <div>
      <form>
        <input value={newListInput} type="text" placeholder="New List"></input>
        <button>Create New List</button>
      </form>
      <div>
        {lists.map((list) => {
          return (
            <List
              list={list}
              key={list.id}
              tasks={list.tasks}
              onDeleteList={onDeleteList}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ListContainer;
