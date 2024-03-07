const apiUrl = "https://todo-api.tottadev.com.br";
const createToDo = "/todo";

const criarToDo = async (dataToBeSent) => {
  try {
    const response = await fetch(apiUrl + createToDo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: dataToBeSent.description,

        title: dataToBeSent.title,
      }),
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

export { criarToDo };
