import React, { useState, useEffect } from "react";

//make a tasks container
//setList in current useEffect
//repeat process for task

function List({ list, onDeleteList }) {
  // const [list, setList] = useState([]);
  console.log(list.id);
  useEffect(() => {
    fetch(`http://localhost:9292/lists/${list.id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  function handleDeleteClick() {
    fetch(`http://localhost:9292/lists/${list.id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((deletedList) => onDeleteList(deletedList));
  }

  return (
    <div>
      <h2>{list.name}</h2>
      <button onClick={() => handleDeleteClick()}>Delete 🗑</button>
    </div>
  );
}

export default List;
