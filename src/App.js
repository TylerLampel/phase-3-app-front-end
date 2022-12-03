import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import ListContainer from "./ListContainer";
import ListDetails from "./ListDetails";
import NewList from "./NewList";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//reduce useEffects, send nested json down

function App() {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9292/lists")
      .then((res) => res.json())
      .then(setLists);
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="lists/new" element={<NewList setLists={setLists} />} />
          <Route
            path="lists"
            element={<ListContainer lists={lists} setLists={setLists} />}
          >
            <Route
              path=":list_id"
              element={<ListDetails setLists={setLists} />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// set state in aapp pass lists to both container and details
// map in both, in details map and where id = useParams id display said list
