import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/todo" className="logo">
          <FontAwesomeIcon icon={faTasks} className="icon" />
          Todolist
        </Link>
        <div className="nav-links">
              <Link to="/login" className="login">
                Login
              </Link>
              <Link to="/signup" className="create-todo-button"> 
                Comece Agora
              </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
