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

// Маршрут для голосования
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/voting.html'));
});

// Маршрут для страницы управления рецептами
app.get('/recipes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/manage-recipes.html'));
});

// Маршрут для страницы управления меню
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/manage-menu.html'));
});

// Маршрут для страницы склада
app.get('/stock', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/stock.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});