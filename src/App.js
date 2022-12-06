import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import ListDetails from "./ListDetails";
import Lists from "./Lists";
import { ListContext } from "./ListContext";
import NewList from "./NewList";
import Navbar from "./Navbar";

//reduce useEffects, send nested json down

function App() {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9292/lists")
      .then((res) => res.json())
      .then(setLists);
  }, []);

  return (
    <ListContext.Provider value={{ lists, setLists }}>
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="lists/new" element={<NewList />} />
            <Route path="lists/" element={<Lists />}>
              <Route path=":list_id" element={<ListDetails />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ListContext.Provider>
  );
}

export default App;

// set state in aapp pass lists to both container and details
// map in both, in details map and where id = useParams id display said list
