import React, {Component} from 'react';
import {statusFilters} from '../../actions/statuses';

export default class TasksList extends Component {

  constructor(props) {
    super(props);
    this.statuses = [];

    for (let item in statusFilters) {
      this.statuses.push(item);
    }

    this.routeName = props[0];

    this.state = {
      tasks: []
    }

    console.log(props);
  }

  componentDidMount() {
    fetch('/api/v1/' + this.routeName)
      .then((res) => res.json())
      .then((data) => this.setState({
        tasks: data.tasks
      }))
  }

  render() {

    const options = this.statuses.map((option, index) =>
      <option value={option} key={index}>
        {option}
      </option>
    )

    const listItems = this.state.tasks.map((task, index) =>
      <li key={index} id={index}>
        <span>{task.name}</span>
        <select value={task.status}>
          {options}
        </select>
        <br/>
        <small>
          {task.date},
        </small>
        <small>
          {task.time},
        </small>
        <br/>
        <br/>
      </li>
    )

    return (
      <ul className="tasks-list">{listItems}</ul>
    )
  }

}
