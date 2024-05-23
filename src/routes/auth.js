const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });

    if (user) {
      const match = await bcrypt.compare(password, user.passwordHash);
      if (match) {
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, message: 'Неверный пароль' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

module.exports = router;
