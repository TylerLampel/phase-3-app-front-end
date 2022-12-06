import { React, useContext } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate } from "react-router-dom";
import { ListContext } from "./ListContext";

function ListContainer({ toDoList }) {
  let navigate = useNavigate();
  const { setLists } = useContext(ListContext);

  function handleDeleteListClick(list_id) {
    fetch(`http://localhost:9292/lists/${list_id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((updatedLists) => setLists(updatedLists));
    navigate("/lists");
  }

  return (
    <div>
      <ListItem
        disableGutters
        disablePadding
        secondaryAction={
          <Button
            size="small"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteListClick(toDoList.id)}
          >
            Delete
          </Button>
        }
      >
        <ListItemButton onClick={() => navigate(`${toDoList.id}`)}>
          <ListItemText primary={toDoList.name} />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default ListContainer;
