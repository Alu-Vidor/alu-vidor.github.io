const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const stockItems = await Stock.find().populate('productId', 'name');
    res.json(stockItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;