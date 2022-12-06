import { React, useContext } from "react";
import List from "@mui/material/List";
import ListContainer from "./ListContainer";
import { ListContext } from "./ListContext";
import { Outlet } from "react-router-dom";

function Lists() {
  const { lists } = useContext(ListContext);

  const renderedLists = lists.map((list) => (
    <ListContainer key={list.id} toDoList={list} />
  ));
  return (
    <div>
      <h2>Lists</h2>
      <List
        sx={{
          width: "100%",
          maxWidth: 300,
          bgcolor: "rgb(217, 221, 183)",
        }}
      >
        {renderedLists}
      </List>
      <Outlet />
    </div>
  );
}

export default Lists;
