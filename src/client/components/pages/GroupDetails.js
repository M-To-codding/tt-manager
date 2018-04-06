import React, {Component} from 'react';

export default class GroupDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groupId: props.match.params.id,
      group: {},
      tasks: [],
      tasksInGroup: [],
      tasksInGroupObj: []
    };

    this.getGroup();
    // console.log(this.state)
  }

  getGroup() {
    fetch(`/api/v1/group/${this.state.groupId}`)
      .then((res) => res.json())
      .then((data) => this.setState({
        group: data.group['0'],
        tasksInGroup: data.group['0'].tasks
      },
        // this.displayGroupTasksList()
        console.log(this.state.tasksInGroup)
      ));
  }

  showTasksList() {
    fetch(`/api/v1/group/${this.state.groupId}/tasks`)
      .then((res) => res.json())
      .then((data) => this.setState({
        tasks: data.tasks || []
      }));
  }

  addTaskIntoList(taskId) {

    let tasksList = this.state.tasksInGroup;
    tasksList.push(taskId);

    fetch(`/api/v1/group/${this.state.groupId}`, {
      method: 'PUT',
      mode: 'CORS',
      body: JSON.stringify({tasks: tasksList, taskId: taskId}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((data) => this.setState({
        tasksInGroupObj: data.tasks
        })
      );
  }

  displayGroupTasksList (){
    console.log('dllddldl')
    if(!this.state.tasksInGroup) {
      return;
    }
    console.log(this.state.tasksInGroup)

    fetch(`/api/v1/group/${this.state.groupId}`, {
       taskId: this.state.tasksInGroup}
    ).then((res) => res.json())
      .then((data) => this.setState({
          tasksInGroupObj: data.tasks || []
        })
      );
  }

  removeTaskFromList() {
  }

  render() {
    // const groupData = this.state.group.map((task, index){
    //
    // });

    if (this.state.group.name) {
      const group = this.state.group;

      let taskList = '',
        allTasks = [];

      if (this.state.tasksInGroupObj) {
        taskList = this.state.tasksInGroupObj.map((task, index) =>
            <p>{task.name}</p>
        )

      } else {
        taskList =
          <p>Tasks not exists</p>;

      }

      if (this.state.tasks.length) {
        let stateTasks = this.state.tasks;
        allTasks = stateTasks.map((task, index) =>
          <p key={index} onClick={()=>this.addTaskIntoList(task._id)}>{task.name}</p>
        )
      }

      return (
        <article className="group-content">
          <input type="text" defaultValue={group.name} className="group-name"/>
          <div className="date-time">
            <span>{group.date}, </span>
            <span>{group.time}</span>
          </div>
          <div className="tasks-list">
            {taskList}
            <button onClick={() => this.showTasksList()} >Choose tasks from list</button>
          </div>
          <div className="unchecked-tasks-list">
            {allTasks}
          </div>
        </article>
      )
    } else {
      return null;
    }
  }
}
