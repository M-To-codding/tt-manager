import Task from "./Task";

const tasks = [];

let tasksItems = [{
  name: 'Ride on a bike',
  status: 'new'
},
  {
    name: 'Swim',
    status: 'wait'
  },
  {
    name: 'Write code',
    status: 'in_work'
  }
];

for (let i = 0; i < tasksItems.length; i++) {
  let taskObj = new Task(tasksItems[i].name, tasksItems[i].status);
  tasks.push(taskObj);
}

export default tasks;