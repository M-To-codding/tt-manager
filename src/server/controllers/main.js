let express = require('express'),
  router = express.Router(),
  Task = require('../models/task');

router.get('/main', function (req, res) {
  Task.find({}, function (err, tasks) {
    res.json({tasks});
    console.log('Server: main controller get: ');
    console.log(tasks);
    res.send('ok', 200);
  })
})

router.post('/main/add', function (req, res) {

  if (!req.body) {
    console.log('Tasks is empty!');
    return;
  }
  let task = new Task(req.body);
  // console.log(req.body);
  task.save((err, taskObj) => {
    res.json({taskObj});
    console.log(taskObj);
  });
})

router.put('/main/:id', function (req, res) {
  if (req.body.status) {
    Task.update({_id: req.params.id}, {status: req.body.status}, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
      }
    })
  } else if (req.body.name) {
    Task.update({_id: req.params.id}, {name: req.body.name}, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
        Task.find({}, function (err, tasks) {
          res.json({tasks});
        });
      }
    })
  } else if (req.body.estimatedTime) {
    Task.update({_id: req.params.id}, {estimatedTime: req.body.estimatedTime}, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
        Task.find({}, function (err, tasks) {
          res.json({tasks});
        });
      }
    })
  } else if (req.body.description) {
    Task.update({_id: req.params.id}, {description: req.body.description}, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
        Task.find({}, function (err, tasks) {
          res.json({tasks});
        });
      }
    })
  }
})

router.delete('/main/delete/:id', function (req, res) {
    Task.findByIdAndRemove(req.params.id, (err, task) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Removed! ');
        Task.find({}, function (err, tasks) {
          res.json({tasks});
          console.log('Server: main controller get: ');
          console.log(tasks);
        })
      }
    })
})
module.exports = router;