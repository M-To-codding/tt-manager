const mongoose = require('mongoose'),
  config = require('./resources/config');

mongoose.connect(config.url, err => {
  if (err) {
    console.log(err);
  }
});

module.exports = mongoose;