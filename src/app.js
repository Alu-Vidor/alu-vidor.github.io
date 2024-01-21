const express = require('express');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const recipesRoutes = require('./routes/recipes');
const menuRoutes = require('./routes/menu');
const stockRoutes = require('./routes/stock');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(cors({
    origin: 'http://localhost:52330'
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/stock', stockRoutes);

module.exports = app;