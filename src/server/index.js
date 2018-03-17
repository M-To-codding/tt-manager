let expess = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  main = '';


app.listen(8080, () => {
  console.log('Server works!');
})

app.use(bodyParser.json());

app.use(express.static(__dirname + './../../build/'));
app.use('api/v1', main);


module.exports = app;