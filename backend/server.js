const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Створюємо додаток Express
const app = express();

// Мідлвари
app.use(cors());
app.use(bodyParser.json());

// Шлях до файлу, де зберігатимемо користувачів
const usersFilePath = path.join(__dirname, 'users.json');

// Перевірка, чи існує файл користувачів
const checkUsersFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    console.log('Файл users.json не знайдений, створюємо новий');
    fs.writeFileSync(usersFilePath, JSON.stringify([])); // Якщо файл не існує, створюємо порожній масив
  }
};

// Зчитуємо користувачів з файлу
const readUsers = () => {
  checkUsersFile();
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Записуємо новий масив користувачів в файл
const writeUsers = (users) => {
  console.log('Записуємо користувачів у файл');
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Маршрут для реєстрації користувача
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log('Отримано дані для реєстрації:', req.body);

  const users = readUsers();
  const existingUser = users.find(
    (user) => user.username === username || user.email === email
  );

  if (existingUser) {
    return res.status(400).json({ message: 'Користувач з таким ім\'ям або емейлом вже існує.' });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  writeUsers(users);

  return res.status(200).json({ message: 'Реєстрація успішна!' });
});

// Маршрут для входу користувача
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Отримано дані для входу:', req.body); // Логування отриманих даних

  const users = readUsers();
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Невірний email або пароль' });
  }

  return res.status(200).json({ message: 'Вхід успішний' });
});

// Запуск серверу
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});
