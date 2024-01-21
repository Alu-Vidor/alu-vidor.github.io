const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Предполагается, что подключение к базе данных уже настроено
const db = require('./db'); // Пример подключения к базе данных

app.use(bodyParser.json());
app.use(express.static('public')); // Папка для статических файлов

// Маршрут для аутентификации
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Получение пользователя из базы данных
        const user = await db.query('SELECT * FROM Admins WHERE Username = ?', [username]);

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

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
