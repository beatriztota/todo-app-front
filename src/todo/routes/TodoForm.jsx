import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarToDo } from "../apis/Apis";
import { CreateToDo } from "../apis/TodoModel";
import "./TodoForm.css";
import { toast } from "react-toastify";

const TodoForm = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleCriarToDo = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando dados para a API");

      const createToDo = new CreateToDo(title, description);

      const response = await criarToDo(createToDo);

      navigate("/");
      toast.success("ToDo criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar ToDo:", error.message);
      toast.error("Erro ao criar ToDo");
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
        <input className="btn" type="submit" value="Enviar" />
      </form>
    </>
  );
};

export default TodoForm;
