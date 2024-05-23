const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Получение списка всех продуктов
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Добавление нового продукта
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const product = new Product({ name });
    await product.save();
    res.status(201).json({ message: 'Продукт добавлен', insertId: product._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;