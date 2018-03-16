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
  status: 'NEW'
},
  {
    name: 'Swim',
    status: 'IN_WORK'
  },
  {
    name: 'Write code',
    status: 'COMPLETED'
  }
];

for (let i = 0; i < tasksItems.length; i++) {
  let taskObj = new Task(tasksItems[i].name, tasksItems[i].status);
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