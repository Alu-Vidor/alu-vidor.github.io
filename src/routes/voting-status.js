const express = require('express');
const router = express.Router();
const VotingStatus = require('../models/VotingStatus');

router.get('/', async (req, res) => {
  try {
    const result = await VotingStatus.findOne().sort({ _id: -1 });
    if (!result) {
      return res.status(404).json({ message: 'Статус голосования не найден' });
    }

    const currentTime = new Date();
    const votingEnded = currentTime >= new Date(result.endTime);

    res.status(200).json({
      status: result.status,
      votingEnded: votingEnded,
      winningMenu: votingEnded ? result.winningMenu : null,
      votingEndTime: result.endTime
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;