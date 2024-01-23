const express = require('express');
const router = express.Router();
const db = require('../db/index.js');

router.get('/', async (req, res) => {
    try {
        const stockItems = await db.query('SELECT Stock.ProductID, Products.Name as ProductName, Stock.Quantity, \
            MeasurementUnits.UnitName, Stock.ArrivalDate, Stock.ShelfLife \
            FROM Stock INNER JOIN Products ON Stock.ProductID = Products.ProductID \
            INNER JOIN MeasurementUnits ON Stock.UnitID = MeasurementUnits.UnitID');
        res.json(stockItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
