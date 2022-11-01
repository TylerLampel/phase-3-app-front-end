import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>List Creator</h1>
      <Link to={"/lists"}>Lists</Link>
    </header>
  );
}

export default Header;
