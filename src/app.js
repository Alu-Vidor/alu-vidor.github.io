const express = require('express');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(cors({
    origin: 'http://localhost:52330'
}));

app.use(express.json());
app.use('/api/auth', authRoutes);

module.exports = app;