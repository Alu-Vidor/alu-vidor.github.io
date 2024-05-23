const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/eatery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Успешное подключение к MongoDB');
}).catch(err => {
  console.error('Ошибка подключения к MongoDB:', err);
});

module.exports = mongoose;