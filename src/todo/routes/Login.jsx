import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { loginUser, registerUser } from '../apis/Apis';
import "./Login.css"

function LoginRegisterPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(null); // Limpa a mensagem de erro/anúncio
    
        try {
            let data = null;
            if (isLogin) {
                data = await loginUser(email, password); // Certifique-se de que email e password estão corretos
                setMessage('Login bem-sucedido! Redirecionando...');
                localStorage.setItem('authToken', data.token);
                navigate('/');
            } else {
                if (password !== confirmPassword) {
                    setMessage('As senhas não coincidem.');
                    return;
                }
    
                const userData = { name, email, password, confirmPassword }; // Criar objeto de dados do usuário
    
                const data = await registerUser(userData); // Chamar a função de registro de usuário
    
                setMessage('Usuário registrado com sucesso! Redirecionando...');
                localStorage.setItem('authToken', data.token);
                navigate('/'); // Redirecionar para a página principal após o registro
            }
        } catch (error) {
            setMessage(`Erro: ${error.message}`);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMessage(null);
    };

    return (
        <div className="login-container">
            <h2>{isLogin ? 'Login' : 'Registro'}</h2>
            <form onSubmit={handleSubmit}>
                {isLogin ? (
                    <>
                        <div className="fieldset">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Corrigido de setUsername para setEmail
                                required
                                autoComplete="email"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="fieldset">
                            <label htmlFor="name">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="fieldset">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}
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
                {!isLogin && (
                    <div className="fieldset">
                        <label htmlFor="confirmPassword">Confirme a senha:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit">{isLogin ? 'Entrar' : 'Registrar'}</button>
                {message && <p className={message.includes('Erro') ? 'error' : 'success'}>{message}</p>}
            </form>
            <p>
                {isLogin ? (
                    <>
                        Não tem uma conta? <button className="registro-button" onClick={toggleForm}>Registre-se</button>
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



