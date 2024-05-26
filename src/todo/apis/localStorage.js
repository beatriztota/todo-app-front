export const storeTokens = (authToken, refreshToken) => {
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
};

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};
