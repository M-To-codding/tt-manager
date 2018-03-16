import React, {Component} from 'react';
import tasks from './tasks';
import Task from "./Task";

export default class TasksForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: tasks,
      value: ''
    };

    this.task = [];

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleBtnSubmit = this.handleBtnSubmit.bind(this);
  }

  handleValueChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleBtnSubmit(event) {

    event.preventDefault();

    if (!this.state.value.length) {
      return;
    }

    this.task.push();
    console.log(this.task)
    this.setState({
        tasks: this.state.tasks.allTasks.push(new Task(this.state.value, 'NEW')),
        value: ''
      });

    console.log(this.state);
  }

  render() {

    return (
        <form onSubmit={this.handleBtnSubmit}>
          <label>
            Task name: {this.state.value}
            <input
              type="text" className="task-input" value={this.state.value} onChange={this.handleValueChange}/>
          </label>
          <input
            type="submit" value="Add task"/>
        </form>
    )
  }

}
