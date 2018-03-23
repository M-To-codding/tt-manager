let express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  index = require('./controllers/index.js'),
  main = require('./controllers/main.js');

require('./db');

app.listen(8080, () => {
  console.log('Server works!');
})

app.use(bodyParser.json());

app.use(express.static(__dirname + './../../build/'));

app.use('/api/v1', index);
app.use('/api/v1', main);


module.exports = app;