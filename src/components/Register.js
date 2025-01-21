import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Імпортуємо useNavigate
import './Auth.css';

const Register = ({ setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Використовуємо хук для редиректу

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log('Username:', username); // Логування введених даних
    console.log('Email:', email); // Логування введених даних
    console.log('Password:', password); // Логування введених даних

    try {
      const response = await axios.post('http://localhost:5000/api/register', { username, email, password });
      console.log('Реєстрація успішна:', response.data); // Логування відповіді від сервера
      setMessage(response.data.message); // Виводимо повідомлення про успішну реєстрацію

      // Якщо реєстрація успішна, редиректимо на нову сторінку (Dashboard)
      navigate('/homepage');
    } catch (error) {
      console.error('Помилка реєстрації:', error); // Логування помилки
      setMessage(error.response?.data?.message || 'Помилка реєстрації');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Реєстрація</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Ім'я користувача"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Зареєструватися</button>
        </form>
        {message && <p>{message}</p>}
        <p onClick={() => setIsLogin(true)} className="switch-link">Маєш акаунт? Увійти</p>
      </div>
    </div>
  );
};

export default Register;
