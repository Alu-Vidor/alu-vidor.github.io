const express = require('express');
const router = express.Router();
const db = require('../db/index.js');

// Получение списка всех продуктов
router.get('/', async (req, res) => {
    try {
        const products = await db.query('SELECT * FROM Products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Добавление нового продукта
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const result = await db.query('INSERT INTO Products (Name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Продукт добавлен', insertId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
