const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  status: String,
  time: String,
  date: String,
  progressTime: String,
  estimatedTime: String,
  description: String
});

module.exports = mongoose.model('Task', taskSchema);