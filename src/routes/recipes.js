const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const authenticateToken = require('../middleware/auth');

// Получение всех рецептов
router.get('/', authenticateToken, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Добавление нового рецепта
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { dishName, description, ingredients } = req.body;
    if (!dishName || !description || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Некорректные данные рецепта' });
    }

    const recipe = new Recipe({ dishName, description, ingredients });
    await recipe.save();
    res.status(201).json({ message: 'Рецепт добавлен', recipeId: recipe._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновление рецепта
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { dishName, description, ingredients } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, { dishName, description, ingredients });

    res.json({ message: 'Рецепт обновлен' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление рецепта
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Рецепт удален' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
