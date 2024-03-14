import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./todo/components/Navbar";
import Home from "./todo/routes/Home";
import TodoForm from "./todo/routes/TodoForm";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="create-todo" element={<TodoForm />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
