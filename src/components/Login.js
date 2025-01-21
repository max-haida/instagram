import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Імпортуємо useNavigate
import './Auth.css';

const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Створюємо navigate для редиректу

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Email:', email); // Логування введених даних
    console.log('Password:', password); // Логування введених даних

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('Вхід успішний:', response.data); // Логування відповіді від сервера
      setMessage(response.data.message); // Виводимо повідомлення про успішний вхід

      // Якщо вхід успішний, редиректимо на нову сторінку (Dashboard)
      navigate('/homepage');
    } catch (error) {
      console.error('Помилка входу:', error); // Логування помилки
      setMessage(error.response?.data?.message || 'Помилка входу');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Увійти</h1>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Увійти</button>
        </form>
        {message && <p>{message}</p>}
        <p onClick={() => setIsLogin(false)} className="switch-link">Немає акаунта? Реєструйся</p>
      </div>
    </div>
  );
};

export default Login;
