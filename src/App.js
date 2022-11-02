import "./App.css";
import React from "react";
import Header from "./Header";
import ListContainer from "./ListContainer";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/lists">
        <ListContainer />
      </Route>
    </div>
  );
}

export default App;
