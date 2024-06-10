import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../apis/Apis";
import { toast } from "react-toastify";
import "./TodoForm.css";

const TodoForm = () => {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [scheduledTo, setScheduledTo] = useState("");
    const navigate = useNavigate();

    const handleCriarToDo = async (e) => {
        e.preventDefault();
        try {
            console.log("Enviando dados para a API");
    
            const scheduled = !!scheduledTo;
    
            let formattedDate = null;
            if (scheduledTo) {
                const dateObject = new Date(scheduledTo);
                formattedDate = dateObject.toISOString(); 
            }
    
            const todoData = {
                title,
                description,
                scheduled,
                scheduled_to: formattedDate 
            };
    
            const response = await createTodo(todoData);
    
            if (response) {
                navigate("/todo"); 
                toast.success("ToDo criada com sucesso!");
            } else {
                toast.error("Erro ao criar ToDo");
            }
        } catch (error) {
            console.error("Erro ao criar ToDo:", error.message);
            toast.error("Erro ao criar ToDo");
        }
    };
    

    return (
        <div className="form-container">
            <h2>Criar Todo</h2>
            <form onSubmit={handleCriarToDo}>
                <label>
                    Título:
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
                <label>
                    Agendar:
                    <input
                        type="datetime-local"
                        value={scheduledTo}
                        onChange={(e) => setScheduledTo(e.target.value)}
                    />
                </label>
                <input className="btn" type="submit" value="Enviar" />
            </form>
        </div>
    );
};

export default TodoForm;
