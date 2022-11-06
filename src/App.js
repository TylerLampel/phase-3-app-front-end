import "./App.css";
import React from "react";
import Header from "./Header";
import ListContainer from "./ListContainer";
import List from "./List";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div>
          <Switch>
            <Route exact path="/">
              <ListContainer />
            </Route>
            <Route exact path="/lists/:id">
              <List />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
