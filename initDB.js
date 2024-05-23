const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Добавьте эту строку
const Product = require('./src/models/Product');
const Recipe = require('./src/models/Recipe');
const Stock = require('./src/models/Stock');
const Admin = require('./src/models/Admin');
const VotingStatus = require('./src/models/VotingStatus');

mongoose.connect('mongodb://localhost:27017/eatery', {
  useNewUrlParser: true, // Эти параметры больше не нужны, их можно убрать
  useUnifiedTopology: true // Эти параметры больше не нужны, их можно убрать
}).then(async () => {
  console.log('Успешное подключение к MongoDB');

  // Очистка существующих данных
  await Product.deleteMany({});
  await Recipe.deleteMany({});
  await Stock.deleteMany({});
  await Admin.deleteMany({});
  await VotingStatus.deleteMany({});

  // Создание начальных данных для продуктов
  const products = [
    { name: 'Молоко' },
    { name: 'Хлеб' },
    { name: 'Сыр' }
  ];
  await Product.insertMany(products);
  console.log('Продукты добавлены');

  // Создание начальных данных для администраторов
  const adminPasswordHash = await bcrypt.hash('admin_password', 10);
  const admins = [
    { username: 'admin', passwordHash: adminPasswordHash }
  ];
  await Admin.insertMany(admins);
  console.log('Администраторы добавлены');

  // Завершение подключения к MongoDB
  mongoose.connection.close();
  console.log('Подключение к MongoDB закрыто');
}).catch(err => {
  console.error('Ошибка подключения к MongoDB:', err);
});