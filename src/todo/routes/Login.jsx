import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { loginUser } from '../apis/Apis';
import "./Login.css";

function LoginRegisterPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(null);
      
        try {
          const data = await loginUser(email, password);
          localStorage.setItem('authToken', data.token);
          navigate('/todo'); 
        } catch (error) {
          setMessage(`Erro: ${error.message}`);
        }
    };

    const handleRegisterClick = () => {
        navigate('/signup'); 
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMessage(null);
    };

    return (
        <div className="login-container">
            <h2>{isLogin ? 'Login' : 'Registro'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="fieldset">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="fieldset">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                    />
                </div>
                <button type="submit">{isLogin ? 'Entrar' : 'Registrar'}</button>
                {message && <p className={message.includes('Erro') ? 'error' : 'success'}>{message}</p>}
            </form>
            <p>
                {isLogin ? (
                    <>
                        Não tem uma conta? <button className="registro-button" onClick={handleRegisterClick}>Registre-se</button>
                    </>
                ) : (
                    <>
                        Já tem uma conta? <button className="registro-button" onClick={toggleForm}>Faça login</button>
                    </>
                )}
            </p>
        </div>
    );
}

export default LoginRegisterPage;
