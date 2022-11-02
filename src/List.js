import React, { useState, useEffect } from "react";

function List({ list }) {
  const [task, setTask] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/lists/${list.id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <div>{list.id}</div>
    </div>
  );
}

export default List;
