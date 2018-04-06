const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  tasks: Array,
  time: String,
  date: String
});

module.exports = mongoose.model('Group', groupSchema);