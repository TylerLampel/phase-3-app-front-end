import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListDetails from "./ListDetails";
import { Outlet, useNavigate } from "react-router-dom";

function ListContainer({ lists, setLists }) {
  let navigate = useNavigate();

  function handleDeleteListClick(list_id) {
    fetch(`http://localhost:9292/lists/${list_id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((updatedLists) => setLists(updatedLists));
  }

  const renderedLists = lists.map((list) => (
    <div key={list.id}>
      <ListItem
        disableGutters
        disablePadding
        secondaryAction={
          <Button
            size="small"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteListClick(list.id)}
          >
            Delete
          </Button>
        }
      >
        <nav>
          <h3>
            <ListItemButton onClick={() => navigate(`:list_id`)}>
              <ListItemText primary={list.name} />
            </ListItemButton>
          </h3>
        </nav>
        <Divider />
      </ListItem>
      <Outlet context={[list]} />
    </div>
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
    </div>
  );
}

export default ListContainer;
