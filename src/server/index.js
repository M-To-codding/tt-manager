let express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  index = require('./controllers/index.js'),
  main = require('./controllers/main.js'),
  work = require('./controllers/work.js'),
  lists = require('./controllers/lists.js');

require('./db');

app.listen(process.env.PORT || 8080, () => {
  console.log('Server works!');
})

app.use(bodyParser.json());

app.use(express.static('build'));

app.use('/', index);
app.use('/api/v1', index);
app.use('/api/v1', main);
app.use('/api/v1', work);
app.use('/api/v1', lists);

app.set('view engine', 'jade');

module.exports = app;