const app = require('./src/app');
const port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для админ-панели
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});