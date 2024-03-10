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

    // Assuming data is an array, you can map it to create ToDo instances
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

export { criarToDo, getToDo };
