import React, {Component} from 'react';

import {statusFilters} from '../../actions/statuses';
import Timer from './../timer/Timer';

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

  handleStatusChange(event) {
    event.preventDefault();

    let taskId = event.target.parentNode.parentNode.id,
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

  showEditInput(event) {
    let elems = event.target.parentNode.childNodes,
      hiddenInput = '',
      task = '';

    for (let i = 0; i < elems.length; i++) {

      if (elems[i].classList.contains('task-name')) {
        task = elems[i];
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

  changeName(event) {

    let taskId = event.target.parentNode.parentNode.id,
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
      return <Timer taskId={task._id} progressTime={task.progressTime} routeName={this.state.routeName}/>;
    } else {
      return '';
    }
  }

  render() {

    const route = this.state.routeName;

    const options = this.statuses.map((option, index) =>
      <option value={option} key={index}>
        {option}
      </option>
    )

    const listItems = this.state.tasks.map((task, index) =>
      <li key={index} id={task._id} className="task-item">

        <div className="form-group">
          <span className="task-name">{task.name}</span>
          <input className="task-name-edit" onChange={this.changeName.bind(this)} defaultValue={task.name} hidden/>

          <img src="https://cdn0.iconfinder.com/data/icons/basic-line-5/1024/edit-128.png"
               alt="rename" className="edit" onClick={this.showEditInput}/>

          <select id={"select-" + task._id} defaultValue={task.status} className="status-select -gray-bg"
                  onChange={this.handleStatusChange.bind(this)}>
            {options}
          </select>
        </div>

        <br/>

        <div className="date-time">
          <small>
            {task.date},&nbsp;
          </small>

          <small>
            {task.time}
          </small>
        </div>
        {
          route === 'lists' &&
          <div>
            <b> {task.progressTime}</b>
          </div>
        }
        <br/>
        <br/>
        {this.renderTimer(task)}
      </li>
    )

    return (
      <ul className="tasks-list">{listItems}</ul>
    )
  }

}
