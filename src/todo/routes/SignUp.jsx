import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../apis/Apis';
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
  
    try {
      if (formData.password !== formData.confirmPassword) {
        setMessage('As senhas não coincidem.');
        return;
      }
  
      const data = await registerUser(formData);
      setMessage('Usuário registrado com sucesso!');
      localStorage.setItem('authToken', data.token);
      navigate('/todo'); 
    } catch (error) {
      setMessage(`Erro: ${error.message}`);
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h2>Inscreva-se</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Insira seu nome..." />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Insira seu e-mail..." />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Insira sua senha..." />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirme a Senha</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirme sua senha..." />
          </div>
          <button type="submit">Inscrever-se</button>
        </form>
        <div className="legal-text">
          <p>Ao continuar, você está concordando com os <Link to="/terms-of-service">Termos de Serviço</Link> e <Link to="/privacy-policy">Política de Privacidade</Link> do Todolist.</p>
          <p>Já se cadastrou? Vá para o <Link to="/login">login</Link></p>
        </div>
        {message && <p className={message.includes('Erro') ? 'error' : 'success'}>{message}</p>}
      </div>
    </div>
  );
};

export default SignUp;
