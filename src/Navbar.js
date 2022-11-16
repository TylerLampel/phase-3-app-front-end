import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/lists/">Lists</NavLink>
        </li>
        <li>
          <NavLink to="/lists/new">Create List</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
