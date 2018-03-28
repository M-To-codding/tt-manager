let express = require('express'),
  router = express.Router(),
  Task = require('../models/task');

router.get('/inWork', function (req, res) {
  Task.find({status: 'IN_WORK'}, function (err, tasks) {
    res.json({tasks});
    console.log('Server: main controller get: ');
    console.log(tasks);
  })
})


router.put('/inWork/:id', function (req, res) {
  if(req.body.status) {
    Task.update({_id: req.params.id}, {status: req.body.status}, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
      }
    })
  } else {
    Task.update({_id: req.params.id}, {name: req.body.name}, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
        Task.find({status: 'IN_WORK'}, function (err, tasks) {
          res.json({tasks});
        });
      }
    })
  }
})


module.exports = router;