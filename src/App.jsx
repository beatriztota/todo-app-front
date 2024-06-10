import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "../src/todo/components/Navbar";
import Home from "./todo/routes/Home";
import TodoForm from "./todo/routes/TodoForm";
import Login from "./todo/routes/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './todo/routes/SignUp';
import TodoList from "./todo/routes/TodoList"

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route index element={<Home />} />
        <Route path="todo" element={<TodoList/>} />
        <Route path="create-todo" element={<TodoForm />} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
