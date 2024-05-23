const express = require('express');
const mongoose = require('./db');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const recipesRoutes = require('./routes/recipes');
const menuRoutes = require('./routes/menu');
const stockRoutes = require('./routes/stock');
const votingStatusRoutes = require('./routes/voting-status');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/voting-status', votingStatusRoutes);

module.exports = app;