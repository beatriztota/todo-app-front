const apiUrl = "https://todo-api.tottadev.com.br";

const endpoints = {
    createToDo: `${apiUrl}/todo`,
    getToDo: (id) => `${apiUrl}/todo/${id}`,
    editToDo: (id) => `${apiUrl}/todo/${id}`,
    deleteToDo: (id) => `${apiUrl}/todo/${id}`,
    refresh: `${apiUrl}/user/refresh`,
    login: `${apiUrl}/user/login`,
    register: `${apiUrl}/user`,
    logout: `${apiUrl}/user/logout`,
    user: (userId) => `${apiUrl}/user/${userId}`,
    pagination: `${apiUrl}/todo/pagination`,
};

const getAuthToken = () => localStorage.getItem("authToken");
const setAuthToken = (token) => localStorage.setItem("authToken", token);
const getRefreshToken = () => localStorage.getItem("refreshToken");
const setRefreshToken = (token) => localStorage.setItem("refreshToken", token);

const checkAuthToken = () => {
    const token = getAuthToken();
    if (!token) {
        return false;
    }
    return true;
};

const refreshAuthToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        window.location.href = "/login";
        return null;
    }

    try {
        const response = await fetch(endpoints.refresh, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            setAuthToken(data.token);
            return data.token;
        } else {
            window.location.href = "/login";
            return null;
        }
    } catch (error) {
        window.location.href = "/login";
        return null;
    }
};

const authenticatedApiRequest = async (apiFunction) => {
    if (!checkAuthToken()) {
        return null;
    }

    let token = getAuthToken();

    const requestFunction = async () => {
        const response = await apiFunction(token);
        return response;
    };

    try {
        let response = await requestFunction();

        if (response.status === 401) {
            token = await refreshAuthToken();
            if (token) {
                response = await requestFunction();
            } else {
                return null;
            }
        }

        return response;
    } catch (error) {
        return null;
    }
};

const createTodo = async (todoData) => { 
    const apiFunction = async (token) => {
        return await fetch(endpoints.createToDo, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(todoData),
        });
    };

    return await authenticatedApiRequest(apiFunction);
};

const getAllTodos = async (limit = 10, offset = 0) => {
    const apiFunction = async (token) => {
        const url = new URL(endpoints.pagination);
        url.searchParams.append('limit', limit);
        url.searchParams.append('offset', offset);

        return await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    };

    return await authenticatedApiRequest(apiFunction);
};


const getTodoById = async (id) => {
    const apiFunction = async (token) => {
        return await fetch(endpoints.getToDo(id), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    };

    return await authenticatedApiRequest(apiFunction);
};


const updateTodoById = async (id, todoData) => {
    const apiFunction = async (token) => {
        return await fetch(endpoints.editToDo(id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(todoData),
        });
    };

    return await authenticatedApiRequest(apiFunction);
};




const deleteTodoById = async (id) => {
    const apiFunction = async (token) => {
        return await fetch(endpoints.deleteToDo(id), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    };

    return await authenticatedApiRequest(apiFunction);
};

const loginUser = async (email, password) => {
    const response = await fetch(endpoints.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        setAuthToken(data.token);
        setRefreshToken(data.refreshToken);
        return data;
    } else {
        throw new Error("Falha ao fazer login");
    }
};


const registerUser = async (userData) => {
    const response = await fetch(endpoints.register, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Falha ao registrar usuário");
    }
};


const logoutUser = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
};

const getUserById = async (userId) => {
    const apiFunction = async (token) => {
        return await fetch(endpoints.user(userId), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    };

    return await authenticatedApiRequest(apiFunction);
};

const updateUser = async (userId, userData) => {
    const apiFunction = async (token) => {
        return await fetch(endpoints.user(userId), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
    };

    return await authenticatedApiRequest(apiFunction);
};

const deleteUser = async (userId) => {
    const apiFunction = async (token) => {
        return await fetch(endpoints.user(userId), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    };

    return await authenticatedApiRequest(apiFunction);
};

export {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodoById,
    deleteTodoById,
    loginUser,
    registerUser,
    getUserById,
    updateUser,
    deleteUser,
    logoutUser,
    checkAuthToken,
    setAuthToken
};
