let express = require('express'),
  router = express.Router(),
  Task = require('../models/task');

router.get('/inWork', function (req, res) {
  Task.find({status: 'IN_WORK'}, function (err, tasks) {
    res.json({tasks});
    console.log('Server: main controller get: ');
    console.log(tasks);

    if (err) {
      res.send(err.status);
    } else {
      res.send('ok', 200);
    }
  })
})

router.put('/inWork/:id', function (req, res) {
  if (req.body.status) {
    Task.update({_id: req.params.id}, {status: req.body.status}, function (err) {
      if (err) {
        console.log(err);
        res.send(err.status);
      } else {
        console.log(req.body);
        res.send('ok', 200);
      }
    })
  } else if (req.body.name) {
    Task.update({_id: req.params.id}, {name: req.body.name}, function (err) {
      if (err) {
        console.log(err);
        res.send(err.status);
      } else {
        console.log(req.body);
        Task.find({status: 'IN_WORK'}, function (err, tasks) {
          res.json({tasks});
        });
      }
    })
  } else if (req.body.progressTime) {
    Task.update({_id: req.params.id}, {progressTime: req.body.progressTime}, function (err) {
      if (err) {
        console.log(err);
        res.send(err.status);
      } else {
        console.log(req.body);
        res.send('ok', 200);
      }
    })
  } else if (req.body.estimatedTime) {
    Task.update({_id: req.params.id}, {estimatedTime: req.body.estimatedTime}, function (err) {
      if (err) {
        console.log(err);
        res.end();
      } else {
        console.log(req.body);
      }
    })
  } else if (req.body.description) {
    Task.update({_id: req.params.id}, {description: req.body.description}, function (err) {
      if (err) {
        console.log(err);
        res.end();
      } else {
        console.log(req.body);
        Task.find({}, function (err, tasks) {
          res.json({tasks});
        });
      }
    })
  }
})


module.exports = router;