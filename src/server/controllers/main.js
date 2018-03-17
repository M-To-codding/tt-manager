let expess = require('express'),
  router = expess.Router(),
  Task = require('../models/task');

router.get('/main', function (req, res) {
  Task.find({}, function (err, tasks) {
    res.json({tasks});
  })
})

router.post('/main/add', function (req, res) {
  let task = new Task(req.body);
  task.save((err, taskObj) => {
    res.json({taskObj})
  });
})

router.update('/main/:id', function (req, res) {
 Task.update({_id: id}, function () {
   res.json({
     'status': 'ok'
   })
 })
})


module.exports = router;