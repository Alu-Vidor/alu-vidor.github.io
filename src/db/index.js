const mysql = require('mysql'); // Зависимость для работы с MySQL
const util = require('util');

// Создание подключения к базе данных
const db = mysql.createConnection({
  host: 'localhost', // Адрес вашей базы данных
  user: 'root', // Ваш пользователь базы данных
  password: '', // Ваш пароль базы данных
  database: 'eatery' // Имя вашей базы данных
});

// Подключение к базе данных
db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Успешное подключение к базе данных');
  }
});

// Преобразование методов запросов в промисы
db.query = util.promisify(db.query);

module.exports = db;