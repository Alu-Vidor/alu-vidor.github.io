const express = require('express');
const router = express.Router();
const db = require('../db/index.js');

// Маршрут для проверки статуса голосования
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT status, winningMenu, endTime FROM VotingStatus ORDER BY id DESC LIMIT 1');
        const currentStatus = result[0];

        if (!currentStatus) {
            return res.status(404).json({ message: 'Статус голосования не найден' });
        }

        const currentTime = new Date();
        const votingEnded = currentTime >= new Date(currentStatus.endTime);

        res.status(200).json({
            status: currentStatus.status,
            votingEnded: votingEnded,
            winningMenu: votingEnded ? currentStatus.winningMenu : null,
            votingEndTime: currentStatus.endTime
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
