let express = require('express'),
  router = express.Router(),
  Task = require('../models/task');
  Group = require('../models/group');

router.get('/lists', function (req, res) {
  Task.find({status: 'COMPLETED'}, function (err, tasks) {
    res.json({tasks});
    console.log('Server: main controller get: ');
    console.log(tasks);
  })
})
router.get('/lists/groups', function (req, res) {
  Group.find({}, function (err, groups) {
    res.json({groups});
    console.log('Server: main controller get: ');
    console.log(groups);
  })
})

router.post('/lists/add', function (req, res) {

  if (!req.body) {
    console.log('Groups is empty!');
    return;
  }
  let group = new Group(req.body);
  // console.log(req.body);
  group.save((err, groupObj) => {
    res.json({groupObj});
    console.log(groupObj);
  });
})

router.put('/lists/:id', function (req, res) {
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
        Task.find({status: 'COMPLETED'}, function (err, tasks) {
          res.json({tasks});
        });
      }
    })
  }
});

router.delete('/lists/delete/:id', function (req, res) {
  Group.findByIdAndRemove(req.params.id, (err, group) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Removed! ');
      Group.find({}, function (err, groups) {
        res.json({groups});
        console.log('Server: main controller get: ');
        console.log(groups);
      })
    }
  })
})


module.exports = router;