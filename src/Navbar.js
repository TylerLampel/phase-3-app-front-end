import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <br />
      <NavLink to="/lists/">Lists</NavLink>
      <br />
      <NavLink to="/lists/new">Create List</NavLink>
    </div>
  );
}

export default Navbar;
