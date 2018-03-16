import React, {Component} from 'react';
import tasks from './../task/tasks';
import {statusFilters} from '../../actions/statuses';

export default class TasksList extends Component {

  constructor(props) {
    super(props);
    this.statuses = [];
    this.tasks = props["0"];

    for (let item in statusFilters) {
      this.statuses.push(item);
    }
  }

  render() {

    const options = this.statuses.map((option, index) =>
      <option value={option} key={index}>
        {option}
      </option>
    )

    const listItems = this.tasks.map((task, index) =>
      <li key={index} id={index}>
        <span>{task.name}</span>
        <select value={task.status}>
          {options}
        </select>
      </li>
    )

    return (
      <ul className="tasks-list">{listItems}</ul>
    )
  }

}
