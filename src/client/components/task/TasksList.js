import React, {Component} from 'react';

import {statusFilters} from '../../actions/statuses';
import Timer from './../timer/Timer';
import ProgressBar from './../progress-bar/ProgressBar';

export default class TasksList extends Component {

  constructor(props) {
    super(props);
    this.statuses = [];

    for (let item in statusFilters) {
      this.statuses.push(item);
    }

    this.state = {
      tasks: [],
      routeName: props[0],
      isEditOn: false
    };

    this.getAllTasks();
  }

  getAllTasks() {
    fetch(`/api/v1/${this.state.routeName}`)
      .then((res) => res.json())
      .then((data) => this.setState({
        tasks: data.tasks
      }))
  }

  handleStatusChange(event, task) {
    // event.preventDefault();

    let taskId = task._id,
      elems = event.target.childNodes,
      elemStatus = '';

    for (let i = 0; i < elems.length; i++) {
      if (elems[i].selected) {
        elemStatus = elems[i].value;
      }
    }

    let taskObj = {
      status: elemStatus
    }

    console.log(event.target);
    fetch(`/api/v1/${this.state.routeName}/${taskId}`, {
      method: 'PUT',
      mode: 'CORS',
      body: JSON.stringify(taskObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  showEditInput(event, task) {
    let elems = event.target.parentNode.childNodes,
      hiddenInput = '',
      taskElem = '';

    for (let i = 0; i < elems.length; i++) {

      if (elems[i].classList.contains('task-name')) {
        taskElem = elems[i];
      }
      if (elems[i].classList.contains('task-name-edit')) {
        hiddenInput = elems[i];
        hiddenInput.removeAttribute('hidden');
      }
    }

    document.body.onclick = function (e) {
      if (!e.target.classList.contains('task-name-edit')) {
        hiddenInput.setAttribute('hidden', 'true');
      }
      return;
    }
  }

  changeName(event, task) {

    let taskId = task._id,
      value = event.target.value;


    fetch(`/api/v1/${this.state.routeName}/${taskId}`, {
      method: 'PUT',
      mode: 'CORS',
      body: JSON.stringify({name: value}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((data) => this.setState({
          tasks: data.tasks
        })
      );
  }

  renderTimer(task) {
    if (this.state.routeName === 'inWork') {
      return <Timer
                taskId={task._id}
                time={task.progressTime}
                onUpdate={(newProgressTime)=> this.updateTaskProgressTime(task._id, newProgressTime)}
                routeName={this.state.routeName} />;
    } else {
      return '';
    }
  }

  updateTaskProgressTime(taskId, newProgressTime) {
    const newTasks = this.state.tasks.slice(0);
    const taskToUpdate = newTasks.find(function(task) {
      return task._id == taskId;
    });
    taskToUpdate.progressTime = newProgressTime;
    this.setState({tasks: newTasks});
  }

  renderProgressBar(task) {
    if (this.state.routeName === 'inWork') {
      return <ProgressBar total={task.estimatedTime} progress={task.progressTime} />;
    } else {
      return '';
    }
  }

  changeEstimate(event, task) {
    if (this.state.routeName === 'lists') {
      return;
    }
    event.target.removeAttribute('disabled');
  }

  handleEstimateChange(event, task) {

    let taskId = task._id,
      newEstimatedTime = event.target.value;

    const newTasks = this.state.tasks.slice(0);
    const taskToUpdate = newTasks.find(function(task) {
      return task._id == taskId;
    });
    taskToUpdate.estimatedTime = newEstimatedTime;
    this.setState({tasks: newTasks});

    fetch(`/api/v1/${this.state.routeName}/${taskId}`, {
      method: 'PUT',
      mode: 'CORS',
      body: JSON.stringify({estimatedTime: newEstimatedTime}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((data) => this.setState({
          tasks: data.tasks
        })
      );
  }

  removeTask(task) {
    let confirmed = window.confirm('Confirm delete task ' + task.name),
      taskId = task._id;

    if (!confirmed) {
      return;
    } else {
      fetch(`/api/v1/${this.state.routeName}/delete/${taskId}`, {
        method: 'DELETE',
        body: JSON.stringify({task: task}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
        .then((data) => this.setState({
            tasks: data.tasks
          })
        );
      console.log('Deleted!');
    }
  }

  showTaskInfo(task) {

  }

  render() {

    const route = this.state.routeName;

    const options = this.statuses.map((option, index) =>
      <option value={option} key={index}>
        {option}
      </option>
    )

    const listItems = this.state.tasks.map((task, index) =>
      <li key={task._id} className="task-item" onClick={() => this.showTaskInfo(task)}>

        <div className="task-info">

          <div className="form-group">
            <div className="">
              <p className="task-name">{task.name}</p>
              <input className="task-name-edit" onChange={(event) => this.changeName(event, task)}
                     defaultValue={task.name} hidden/>

              <img src="https://cdn0.iconfinder.com/data/icons/basic-line-5/1024/edit-128.png"
                   alt="rename" className="edit" onClick={this.showEditInput}/>
            </div>

          </div>

          <div>
            <select id={"select-" + task._id} defaultValue={task.status} className="status-select -transp-bg"
                    onChange={(event) => this.handleStatusChange(event, task)}>
              {options}
            </select>

            <span onClick={(event) => this.changeEstimate(event)} className="estimate-input">
              E. time:
            <input type="number"
                   min="3.0"
                   name="estimate"
                   className="estimate"
                   defaultValue={task.estimatedTime || 'unset'}
                   onChange={(event) => this.handleEstimateChange(event, task)}
                   disabled="true"/>
          </span>

            {
              route === 'lists' &&
              <div className="spended-time">
                S. time: <b>{task.progressTime}</b>
              </div>
            }

            {this.renderTimer(task)}
            {this.renderProgressBar(task)}

          </div>
        </div>

        <div className="date-time">
          <p>
            <small>{task.time}</small>
          </p>
          <hr/>
          <p>
            <small>{task.date}</small>
          </p>
        </div>

        <div className="delete-elem" onClick={() => this.removeTask(task)}>
          &#215;
        </div>
      </li>
    )

    return (
      <ul className={'tasks-list ' + route}>{listItems}</ul>
    )
  }

}
