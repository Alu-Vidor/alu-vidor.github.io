const express = require('express');
const router = express.Router();
const db = require('../db/index.js'); 

// Запуск голосования
router.post('/start-voting', async (req, res) => {
    try {
        // Получаем текущее время и вычисляем время окончания голосования
        const currentTime = new Date();
        const endTime = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000); // Добавляем 12 часов

        // Добавляем статус голосования в VotingStatus
        await db.query('INSERT INTO VotingStatus (status, endTime) VALUES (?, ?)', ['active', endTime]);

        // Сохраняем информацию о меню в таблицу DailyMenus
        const menus = req.body.menus; // Предполагаем, что меню передаются в теле запроса
        for (const menu of menus) {
            await db.query('INSERT INTO DailyMenus (MenuID, Date, FirstCourseID, SecondCourseID, DessertID, DrinkID) VALUES (?, ?, ?, ?, ?, ?)', 
                [menu.menuId, currentTime, menu.firstCourseId, menu.secondCourseId, menu.dessertId, menu.drinkId]);
        }

        res.status(200).json({ message: 'Голосование запущено' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Остановка голосования
router.post('/stop-voting', async (req, res) => {
    try {
        const result = await db.query('SELECT menuId, COUNT(*) as votes FROM Votes GROUP BY menuId ORDER BY votes DESC LIMIT 1');
        const winningMenu = result[0]?.menuId || null;

        await db.query('UPDATE VotingStatus SET status = ?, winningMenu = ? WHERE status = ?', ['inactive', winningMenu, 'active']);
        res.status(200).json({ message: 'Голосование остановлено', winningMenu });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
