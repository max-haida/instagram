import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage'; // Пустий компонент для нової сторінки після входу
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true); // Перемикач для логіну та реєстрації

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />} />
          <Route path="/homepage" element={<Homepage />} /> {/* Новий маршрут для "пустої" сторінки після входу */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
