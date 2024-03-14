import React, { useState, useEffect } from "react";
import { getToDo, editarToDo, deletarToDo } from "../apis/Apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./TodoList.css";
import { toast } from "react-toastify";

const ToDoList = () => {
  const [toDos, setToDos] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedToDo, setEditedToDo] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await deletarToDo(id);
      setToDos(toDos.filter((todo) => todo.id !== id));
      toast.success("ToDo excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar ToDo:", error.message);
      toast.error("Erro ao excluir ToDo");
    }
  };

  const handleEdit = (id) => {
    setEditMode(id);
    const selectedToDo = toDos.find((todo) => todo.id === id);
    setEditedToDo(selectedToDo);
  };

  const handleSaveEdit = async () => {
    try {
      await editarToDo(editedToDo.id, editedToDo);
      setEditMode(null);
      setEditedToDo(null);
      const updatedToDos = toDos.map((todo) =>
        todo.id === editedToDo.id ? editedToDo : todo
      );
      setToDos(updatedToDos);
      toast.success("ToDo editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar ToDo:", error.message);
      toast.error("Erro ao editar ToDo");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedToDo(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedToDo({
      ...editedToDo,
      [name]: value,
    });
  };

  return (
    <div className="todo-container">
      <ul>
        {toDos && toDos.length > 0 ? (
          toDos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {editMode === todo.id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editedToDo.title}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    value={editedToDo.description}
                    onChange={handleChange}
                    required
                  />
                  <button className="button save" onClick={handleSaveEdit}>
                    Salvar
                  </button>
                  <button className="button cancel" onClick={handleCancelEdit}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <div className="icon-container">
                    <button
                      onClick={() => handleEdit(todo.id)}
                      className="icon-button"
                    >
                      <FontAwesomeIcon icon={faEdit} className="icon" />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="icon-button"
                    >
                      <FontAwesomeIcon icon={faTrash} className="icon" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>Você ainda não criou nenhuma ToDo...</p>
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
