import React, { useState, useEffect } from "react";
import { getToDo } from "../apis/Apis";
import "./TodoList.css";

const ToDoList = () => {
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const toDosData = await getToDo();
        setToDos(toDosData);
      } catch (error) {
        console.error("Error fetching ToDos:", error.message);
      }
    };

    fetchToDos();
  }, []);
  console.log(toDos);
  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <strong>{todo.title}</strong>
            <p>{todo.description}</p>
            {todo.scheduled && (
              <>
                <input type="checkbox" checked={todo.scheduled} />
                <p>{todo.scheduled_to}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
