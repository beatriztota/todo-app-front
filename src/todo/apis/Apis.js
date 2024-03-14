import { CreateToDo, ToDo } from "./TodoModel";

const apiUrl = "https://todo-api.tottadev.com.br";
const createToDoUrl = "/todo";
const getToDosUrl = "/todos";

const criarToDo = async (createToDo) => {
  try {
    const response = await fetch(apiUrl + createToDoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createToDo),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar ToDo");
    }

    console.log(await response.json());
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("A requisição foi cancelada.");
    } else {
      console.error("Erro ao chamar a API:", error.message);
    }
  }
};

const getToDo = async () => {
  try {
    const response = await fetch(apiUrl + getToDosUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.data) {
      console.error("Data is null or undefined");
      return [];
    }

    console.log("Response data:", data);

    const toDos = data.data.map(
      (todoData) =>
        new ToDo(
          todoData.title,
          todoData.description,
          todoData.scheduled,
          todoData.completed,
          todoData.completed_at,
          todoData.id,
          todoData.scheduled_to
        )
    );

    return toDos;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("A requisição foi cancelada.");
    } else {
      console.error("Erro ao chamar a API:", error.message);
    }
  }
};

const editarToDo = async (id, updatedToDo) => {
  try {
    const response = await fetch(`${apiUrl}/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToDo),
    });

    if (!response.ok) {
      throw new Error("Erro ao editar ToDo");
    }

    console.log(await response.json());
  } catch (error) {
    console.error("Erro ao chamar a API para edição:", error.message);
  }
};

const deletarToDo = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/todo/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar ToDo");
    }

    console.log("ToDo deletado com sucesso");
  } catch (error) {
    console.error("Erro ao chamar a API para exclusão:", error.message);
  }
};

export { criarToDo, getToDo, editarToDo, deletarToDo };

