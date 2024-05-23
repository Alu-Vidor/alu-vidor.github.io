const express = require('express');
const router = express.Router();
const VotingStatus = require('../models/VotingStatus');

router.post('/start-voting', async (req, res) => {
  try {
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);

    const newVotingStatus = new VotingStatus({ status: 'active', endTime });
    await newVotingStatus.save();

    res.status(200).json({ message: 'Голосование запущено' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/stop-voting', async (req, res) => {
  try {
    const result = await VotingStatus.findOne().sort({ _id: -1 });
    const winningMenu = result ? result.winningMenu : null;

    await VotingStatus.updateOne({ status: 'active' }, { status: 'inactive', winningMenu });
    res.status(200).json({ message: 'Голосование остановлено', winningMenu });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;