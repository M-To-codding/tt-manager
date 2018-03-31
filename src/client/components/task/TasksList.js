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

  changeEstimate(event) {
    console.log(event.target);
    if (this.state.routeName === 'lists') {
      return;
    }
    event.target.removeAttribute('disabled');
  }

  handleEstimateChange(event) {

    let taskId = event.target.parentNode.parentNode.parentNode.id,
      value = event.target.value;

    console.log('Changed estimate')
    fetch(`/api/v1/${this.state.routeName}/${taskId}`, {
      method: 'PUT',
      mode: 'CORS',
      body: JSON.stringify({estimatedTime: value}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((data) => this.setState({
          tasks: data.tasks
        })
      );
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

        <div className="task-info">
          <div className="form-group">
            <span className="task-name">{task.name}</span>
            <input className="task-name-edit" onChange={this.changeName.bind(this)} defaultValue={task.name} hidden/>

            <img src="https://cdn0.iconfinder.com/data/icons/basic-line-5/1024/edit-128.png"
                 alt="rename" className="edit" onClick={this.showEditInput}/>

            <select id={"select-" + task._id} defaultValue={task.status} className="status-select -gray-bg"
                    onChange={this.handleStatusChange.bind(this)}>
              {options}
            </select>
            <span onClick={this.changeEstimate.bind(this)} className="estimate-input">Estimated time:
            <input type="number"
                   min="3.0"
                   name="estimate"
                   className="estimate"
                   defaultValue={task.estimatedTime || 'unset'}
                   onChange={this.handleEstimateChange.bind(this)}
                   disabled="true"/>
          </span>
          </div>

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
            <div className="spended-time">
              Spended time: <b>{task.progressTime}</b>
            </div>
          }
        </div>

        {this.renderTimer(task)}
      </li>
    )

    return (
      <ul className="tasks-list">{listItems}</ul>
    )
  }

}
