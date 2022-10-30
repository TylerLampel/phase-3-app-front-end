import React, { useState, useEffect } from "react";
import List from "./List";

function ListContainer() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/lists")
      .then((res) => res.json())
      .then(setLists);
  }, []);

  return (
    <div>
      {lists.map((list) => {
        return <List list={list} key={list.id} />;
      })}
    </div>
  );
}

export default ListContainer;
