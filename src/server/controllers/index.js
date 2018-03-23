let expess = require('express'),
  router = expess.Router(),
  path = require('path'),
  client = __dirname + '../../../../build/';

router.get('/', function (req, res) {
  res.setHeader('conten-type', 'application/javascript');
  res.sendFile(path.join(client + 'index.html'));
})


module.exports = router;