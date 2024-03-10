import React, { useState } from "react";
import { criarToDo } from "../apis/Apis";
import { format } from "date-fns";
import { CreateToDo } from "../apis/TodoModel";
import "./TodoForm.css"

const TodoForm = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleCriarToDo = async (e) => {
    e.preventDefault();
    try {
      console.log("enviando dados para a API");

      const createToDo = new CreateToDo(title, description);

      const response = await criarToDo(createToDo);
    } catch (error) {
      console.error("Erro ao criar ToDo:", error.message);
    }
  };

  return (
    <>
      <h1>Criar ToDo</h1>
      <form onSubmit={handleCriarToDo}>
        <label>
          Titulo:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Descrição:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Criar</button>
      </form>
    </>
  );
};

export default TodoForm;
