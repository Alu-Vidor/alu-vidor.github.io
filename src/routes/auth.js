const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../db/index.js'); // Пример подключения к базе данных

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Получение пользователя из базы данных
        const user = await db.query(`SELECT * FROM Admins WHERE Username = '${username}'`);

        if (user.length > 0) {
            // Проверка пароля
            const match = await bcrypt.compare(password, user[0].PasswordHash);

            if (match) {
                res.json({ success: true, message: "Аутентификация успешна" });
            } else {
                res.json({ success: false, message: "Неверный пароль" });
            }
        } else {
            res.json({ success: false, message: "Пользователь не найден" });
        }
    } catch (error) {
        console.error('Ошибка аутентификации:', error);
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
});

module.exports = router;
