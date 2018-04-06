let express = require('express'),
  router = express.Router(),
  Group = require('../models/group'),
  Task = require('../models/task');

router.get('/group/:id', function (req, res) {
  Group.find({_id: req.params.id}, function (err, group) {
    res.json({group});
    console.log('Server: main controller get: ');
    console.log(group);
  })
});
router.get('/group/:id/tasks', function (req, res) {
  Task.find({}, function (err, tasks) {
    res.json({tasks});
    console.log('Server: main controller get: ');
    console.log(tasks);
  })
});
router.get('/group/:id', function (req, res) {
  Task.find({_id: {$in: req.body.tasksInGroup}}, function (err, tasks) {
    res.json({tasks});
    console.log('Server: main controller get: ');
    console.log(tasks);
  })
});

router.put('/group/:id', function (req, res) {
  Group.update({_id: req.params.id}, {tasks: req.body.tasks}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body);
      Task.find({_id: req.params.taskId}, function (err, tasks) {
        res.json({tasks});
      });
    }
  })
})


module.exports = router;