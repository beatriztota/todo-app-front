import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getAllTodos, deleteTodoById, updateTodoById } from "../apis/Apis";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
    const [totalPendingTasks, setTotalPendingTasks] = useState(0); 
    const [completedTodoId, setCompletedTodoId] = useState(null);
    const [deletedTodoId, setDeletedTodoId] = useState(null);

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

            const totalPending = await calculateTotalPendingTasks();
            setTotalPendingTasks(totalPending);
        } catch (error) {
            console.error("Erro ao obter todos os Todos:", error.message);
            toast.error("Erro ao obter Todos");
        }
    };

    const calculatePendingTasks = () => {
        const pending = toDos.filter(todo => !todo.completed).length;
        setPendingTasks(pending);
    };

    const calculateTotalPendingTasks = async () => {
        try {
            const response = await getAllTodos(Number.MAX_SAFE_INTEGER, 0);
            if (!response || !response.ok) {
                throw new Error(`Erro ao calcular total de pendentes: ${response ? response.statusText : 'Unknown Error'}`);
            }
            const data = await response.json();
            const totalPending = data.data.filter(todo => !todo.completed).length;
            return totalPending;
        } catch (error) {
            console.error("Erro ao calcular total de pendentes:", error.message);
            toast.error("Erro ao calcular total de pendentes");
            return 0;
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleDelete = async (id) => {
        setDeletedTodoId(id);
        setTimeout(async () => {
            try {
                const response = await deleteTodoById(id);
                if (response.ok) {
                    setToDos(prevToDos => prevToDos.filter(todo => todo.id !== id));
                    setTotalPendingTasks(prevTotal => prevTotal - 1); 
                    toast.success("To-Do deletado com sucesso");
                } else {
                    throw new Error("Erro ao deletar o To-Do");
                }
            } catch (error) {
                console.error("Erro ao deletar o To-Do:", error.message);
                toast.error("Erro ao deletar o To-Do");
            } finally {
                setDeletedTodoId(null);
            }
        }, 300); 
    };

    const handleEdit = (id, title, description, scheduledTo) => {
        setEditingTodo(id);
        setEditTitle(title);
        setEditDescription(description);
        setEditScheduledTo(scheduledTo || "");
    };

    const handleSaveEdit = async (id) => {
        try {
            let formattedDate = null;
            if (editScheduledTo) {
                const dateObject = new Date(editScheduledTo);
                if (!isNaN(dateObject.getTime())) {
                    formattedDate = dateObject.toISOString();
                }
            }

            const updatedTodo = {
                ...toDos.find(todo => todo.id === id),
                title: editTitle,
                description: editDescription,
                scheduled: !!formattedDate,
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
        setCompletedTodoId(id);
        setTimeout(async () => {
            try {
                const updatedTodo = { ...toDos.find(todo => todo.id === id), completed: true };
                const response = await updateTodoById(id, updatedTodo);
                if (response.ok) {
                    setToDos(prevToDos => prevToDos.filter(todo => todo.id !== id));
                    setTotalPendingTasks(prevTotal => prevTotal - 1); 
                    toast.success("Tarefa concluída");
                } else {
                    throw new Error("Erro ao marcar a tarefa como concluída");
                }
            } catch (error) {
                console.error("Erro ao marcar a tarefa como concluída:", error.message);
                toast.error("Erro ao marcar a tarefa como concluída");
            } finally {
                setCompletedTodoId(null);
            }
        }, 300); 
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="welcome-section">
                    <h1>Bem-vindo à Sua Lista de Tarefas</h1>
                    <p>Você tem {totalPendingTasks} tarefas pendentes.</p>
                </div>
                <div className="action-section">
                    <Link to="/create-todo" className="create-task-button">
                        Criar Nova Tarefa
                    </Link>
                </div>
            </div>
            <div className="todo-container-todo">
                <TransitionGroup component="ul" className="todo-list">
                    {toDos.map(todo => (
                        <CSSTransition
                            key={todo.id}
                            timeout={300}
                            classNames={todo.id === completedTodoId ? "fade-complete" : todo.id === deletedTodoId ? "fade-delete" : ""}
                        >
                            <li key={todo.id} className={`todo-item ${todo.id === completedTodoId ? "completed" : todo.id === deletedTodoId ? "deleted" : ""}`}>
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
                                        <button className="save-button" onClick={() => handleSaveEdit(todo.id)}>Salvar</button>
                                    </div>
                                ) : (
                                    <div className="todo-content">
                                        <h3>{todo.title}</h3>
                                        <p>{todo.description}</p>
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
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={handlePreviousPage}>
                        Anterior
                    </button>
                    <button onClick={handleNextPage}>
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;
