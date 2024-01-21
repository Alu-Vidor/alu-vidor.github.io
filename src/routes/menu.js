const express = require('express');
const router = express.Router();
const db = require('../db/index.js'); // Предполагается, что у вас есть модуль db для взаимодействия с БД

// Запуск голосования
router.post('/start-voting', async (req, res) => {
    // Логика для запуска голосования
    try {
        // Код для установки статуса голосования в "активный"
        // Например, обновление поля в БД
        res.status(200).json({ message: 'Голосование запущено' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Остановка голосования
router.post('/stop-voting', async (req, res) => {
    // Логика для остановки голосования
    try {
        // Код для установки статуса голосования в "неактивный"
        // Например, обновление поля в БД
        res.status(200).json({ message: 'Голосование остановлено' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
