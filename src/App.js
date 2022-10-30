import "./App.css";
import React from "react";
import Header from "./Header";
import ListContainer from "./ListContainer";

function App() {
  // const [task, setTask] = useState("");

  // fetch("http://localhost:9292/items", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     task: task,
  //     importance: importance,
  //     completed: completed,
  //     list_id: list_id,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((newTask) => console.log(newTask));

  return (
    <div className="App">
      <Header />
      <ListContainer />
    </div>
  );
}

export default App;
