import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
      <h2>ToDo List</h2>
      </Link>
      <Link to="/create-todo">
        <button>Criar Todo </button>
      </Link>
    </nav>
  );
};

export default Navbar;
