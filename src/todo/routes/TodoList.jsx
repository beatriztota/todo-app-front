import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getAllTodos, deleteTodoById, updateTodoById } from "../apis/Apis";
import "./TodoList.css";

const ToDoList = () => {
    const [toDos, setToDos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);
    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editScheduledTo, setEditScheduledTo] = useState("");
    const [pendingTasks, setPendingTasks] = useState(0);

    useEffect(() => {
        fetchToDos(currentPage);
    }, [currentPage]);

    useEffect(() => {
        calculatePendingTasks();
    }, [toDos]);

    const fetchToDos = async (page) => {
        try {
            const response = await getAllTodos(limit, (page - 1) * limit);
            if (!response || !response.ok) {
                throw new Error(`Erro ao obter ToDos: ${response ? response.statusText : 'Unknown Error'}`);
            }
            const data = await response.json();
            const updatedToDos = Array.isArray(data.data) ? data.data : []; 
            setToDos(updatedToDos);
    
            const totalItems = data.total; 
            const totalPages = Math.ceil(totalItems / limit);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Erro ao obter todos os ToDos:", error.message);
            toast.error("Erro ao obter ToDos");
        }
    };

    const calculatePendingTasks = () => {
        const pending = toDos.filter(todo => !todo.completed).length;
        setPendingTasks(pending);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteTodoById(id);
            if (response.ok) {
                setToDos(prevToDos => prevToDos.filter(todo => todo.id !== id));
                toast.success("To-Do deletado com sucesso");
            } else {
                throw new Error("Erro ao deletar o To-Do");
            }
        } catch (error) {
            console.error("Erro ao deletar o To-Do:", error.message);
            toast.error("Erro ao deletar o To-Do");
        }
    };

    const handleEdit = (id, title, description, scheduledTo) => {
        console.log("Editando Todo:", id);
        setEditingTodo(id);
        setEditTitle(title);
        setEditDescription(description);
        setEditScheduledTo(scheduledTo);
        console.log("Editando título:", title);
        console.log("Editando descrição:", description);
        console.log("Agendado para:", scheduledTo);
    };
    
    const handleSaveEdit = async (id) => {
        console.log("Salvando a edição da todo:", id);
        console.log("Editando título", editTitle);
        console.log("Editando descrição:", editDescription);
        console.log("Editando agendado para:", editScheduledTo);
        try {
            let formattedDate = null;
            if (editScheduledTo) {
                const dateObject = new Date(editScheduledTo);
                formattedDate = dateObject.toISOString();
            }
    
            const updatedTodo = { 
                ...toDos.find(todo => todo.id === id), 
                title: editTitle, 
                description: editDescription,
                scheduled: !!editScheduledTo,
                scheduled_to: formattedDate
            };
            const response = await updateTodoById(id, updatedTodo);
            if (response.ok) {
                setToDos(prevToDos => prevToDos.map(todo => todo.id === id ? updatedTodo : todo));
                setEditingTodo(null);
                setEditTitle("");
                setEditDescription("");
                setEditScheduledTo("");
                toast.success("Tarefa editada com sucesso");
            } else {
                throw new Error("Erro ao editar a tarefa");
            }
        } catch (error) {
            console.error("Erro ao editar a tarefa:", error.message);
            toast.error("Erro ao editar a tarefa");
        }
    };

    const handleTaskCompletion = async (id) => {
        try {
            const updatedTodo = { ...toDos.find(todo => todo.id === id), completed: true };
            const response = await updateTodoById(id, updatedTodo);
            if (response.ok) {
                setToDos(prevToDos => prevToDos.filter(todo => todo.id !== id));
                toast.success("Tarefa concluída");
            } else {
                throw new Error("Erro ao marcar a tarefa como concluída");
            }
        } catch (error) {
            console.error("Erro ao marcar a tarefa como concluída:", error.message);
            toast.error("Erro ao marcar a tarefa como concluída");
        }
    };

    return (
        <div>
            <div className="home-container">
              <div className="welcome-section">
                <h1>Bem-vindo à Sua Lista de Tarefas</h1>
                <p>Você tem {pendingTasks} tarefas pendentes.</p>
              </div>
              <div className="action-section">
                <Link to="/create-todo" className="create-task-button">
                  Criar Nova Tarefa
                </Link>
              </div>
            </div>
            <ul className="todo-list">
                {toDos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        {editingTodo === todo.id ? (
                            <div className="edit-fields">
                                <h4>Título</h4>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Novo título"
                                />
                                <h4>Descrição</h4>
                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder="Nova descrição"
                                />
                                <h4>Agendar</h4>
                                <input
                                    type="datetime-local"
                                    value={editScheduledTo}
                                    onChange={(e) => setEditScheduledTo(e.target.value)}
                                />
                                <button onClick={() => handleSaveEdit(todo.id)}>Salvar</button>
                            </div>
                        ) : (
                            <div className="todo-content">
                                <h3>{todo.title}</h3>
                                <p>{todo.description}</p>
                                {todo.scheduled && (
                                    <p>Agendado para: {new Date(todo.scheduled_to).toLocaleString()}</p>
                                )}
                            </div>
                        )}
                        <div className="todo-actions">
                            {!todo.completed && (
                                <button className="icon-button" onClick={() => handleTaskCompletion(todo.id)}>
                                    <FontAwesomeIcon icon={faCheck} className="icon" />
                                </button>
                            )}
                            <button className="icon-button" onClick={() => handleEdit(todo.id, todo.title, todo.description, todo.scheduled_to)}>
                                <FontAwesomeIcon icon={faEdit} className="icon" />
                            </button>
                            <button className="icon-button" onClick={() => handleDelete(todo.id)}>
                                <FontAwesomeIcon icon={faTrash} className="icon" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={handlePreviousPage}>
                        Anterior
                    </button>
                )}
                {currentPage < totalPages && (
                    <button onClick={handleNextPage}>
                        Próxima
                    </button>
                )}
            </div>
        </div>
    );
}    

export default ToDoList;
