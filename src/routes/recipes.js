const express = require('express');
const router = express.Router();
const db = require('../db/index.js');

// Получение всех рецептов
router.get('/', async (req, res) => {
    try {
        const recipes = await db.query('SELECT * FROM Recipes');
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Добавление нового рецепта
router.post('/', async (req, res) => {
    try {
        const { dishName, description, ingredients } = req.body;
        if (!dishName || !description || !Array.isArray(ingredients)) {
            return res.status(400).json({ error: 'Некорректные данные рецепта' });
        }

        const recipeResult = await db.query('INSERT INTO Recipes (DishName, Description) VALUES (?, ?)', [dishName, description]);
        const recipeId = recipeResult.insertId;

        for (const ingredient of ingredients) {
            if (!ingredient.productId || !ingredient.quantity) {
                continue; // Пропустить некорректные ингредиенты
            }
            await db.query('INSERT INTO RecipeIngredients (RecipeID, ProductID, RequiredQuantity) VALUES (?, ?, ?)', [recipeId, ingredient.productId, ingredient.quantity]);
        }

        res.status(201).json({ message: 'Рецепт добавлен', recipeId: recipeId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Обновление рецепта
router.put('/:id', async (req, res) => {
    try {
        const { dishName, description, ingredients } = req.body;
        await db.query('UPDATE Recipes SET DishName = ?, Description = ? WHERE RecipeID = ?', [dishName, description, req.params.id]);

        // Обновление ингредиентов рецепта
        // Удаление существующих ингредиентов
        await db.query('DELETE FROM RecipeIngredients WHERE RecipeID = ?', [req.params.id]);
        // Добавление новых ингредиентов
        for (const ingredient of ingredients) {
            await db.query('INSERT INTO RecipeIngredients (RecipeID, ProductID, RequiredQuantity) VALUES (?, ?, ?)',
            [req.params.id, ingredient.productId, ingredient.quantity]);
        }

        res.json({ message: 'Рецепт обновлен' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Удаление рецепта
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM RecipeIngredients WHERE RecipeID = ?', [req.params.id]);
        await db.query('DELETE FROM Recipes WHERE RecipeID = ?', [req.params.id]);
        res.json({ message: 'Рецепт удален' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;