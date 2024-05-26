import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          todolist
        </Link>
        <div className="nav-links">
          <Link to="/login" className="login">
            Login
          </Link>
          <Link to="/create-todo" className="create-todo-button">
            Criar tarefa
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
