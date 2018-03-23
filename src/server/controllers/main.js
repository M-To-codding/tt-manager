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
  console.log(req.body);
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
  Task.update({_id: id}, function () {
    res.json({
      'status': 'ok'
    })
  })
})


module.exports = router;