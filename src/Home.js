import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function Home() {
  return (
    <div>
      <Paper elevation={3}>
        <h2>Home</h2>
        <p>Thank you for choosing List Creator!</p>
        <p>Feel free to explore and create as many lists you like!</p>
        <p>
          You can make a task list for any occasion! From grocerie shopping to
          getting ready for that new baby!
        </p>
      </Paper>
    </div>
  );
}

export default Home;
