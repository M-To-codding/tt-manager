let express = require('express'),
  router = express.Router(),
  Task = require('../models/task');

router.get('/main', function (req, res) {
  Task.find({}, function (err, tasks) {
    res.json({tasks});
    console.log('Server: main controller get: ');
    console.log(tasks);
  })
})

router.post('/main/add', function (req, res) {

  if (!req.body){
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
        Task.find({}, function (err, tasks) {
          res.json({tasks});
        });
      }
    })
  }
})


module.exports = router;