import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

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
      <List
        sx={{
          width: "100%",
          maxWidth: 300,
          bgcolor: "rgb(217, 221, 183)",
        }}
      >
        {lists.map((list) => (
          <ListItem
            disableGutters
            disablePadding
            key={list.id}
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
                <ListItemButton href={`/lists/${list.id}`}>
                  <ListItemText primary={list.name} />
                </ListItemButton>
              </h3>
            </nav>
            <Divider />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ListContainer;
