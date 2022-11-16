import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListContainer() {
  const [lists, setLists] = useState([]);

  // active record terminology
  // practice OO ruby
  // right setter and getters (not attr_reader)

  useEffect(() => {
    fetch("http://localhost:9292/lists")
      .then((res) => res.json())
      .then(setLists);
  }, []);

  function handleDeleteListClick(list_id) {
    fetch(`http://localhost:9292/lists/${list_id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((updatedLists) => setLists(updatedLists));
  }

  return (
    <div>
      <h2>Lists</h2>
      {lists.map((list) => (
        <div key={list.id}>
          <h3>
            <Link to={`/lists/${list.id}`}>{list.name}</Link>
            <button onClick={() => handleDeleteListClick(list.id)}>
              Delete 🗑
            </button>
          </h3>
        </div>
      ))}
    </div>
  );
}

export default ListContainer;
