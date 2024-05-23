const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votingStatusSchema = new Schema({
  status: { type: String, required: true },
  winningMenu: { type: String },
  endTime: { type: Date, required: true }
});

module.exports = mongoose.model('VotingStatus', votingStatusSchema);