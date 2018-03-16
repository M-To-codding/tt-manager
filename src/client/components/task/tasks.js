import Task from "./Task";
import {statusFilters} from '../../actions/statuses';

let allTasks = [];
let processingTasks = [];
let completedTasks = [];

const tasks = {
  allTasks: allTasks,
  processingTasks: processingTasks,
  completedTasks: completedTasks
};

let tasksItems = [{
  name: 'Ride on a bike',
  status: 'NEW',
  time: '11:18:32',
  date: '10.03.2018'
},
  {
    name: 'Swim',
    status: 'IN_WORK',
    time: '10:18:32',
    date: '14.03.2018'
  },
  {
    name: 'Write code',
    status: 'COMPLETED',
    time: '00:18:32',
    date: '15.03.2018'
  }
];

for (let i = 0; i < tasksItems.length; i++) {
  let taskObj = new Task({
    name: tasksItems[i].name, status: tasksItems[i].status, time: tasksItems[i].time,
    date: tasksItems[i].date
  });
  allTasks.push(taskObj);
}

allTasks.forEach(function (task, index) {
  if (task.status === statusFilters.IN_WORK) {
    processingTasks.push(task);
  } else if (task.status === statusFilters.COMPLETED) {
    completedTasks.push(task);
  }
});

export default tasks;