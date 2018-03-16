import React, {Component} from 'react';
import {LocalForm, Control, Errors} from 'react-redux-form';

import tasks from './tasks';
import Task from "./Task";

export default class TasksForm extends Component {

  constructor(props) {
    super(props);

    this.tasksArr = tasks.allTasks;
    console.log(this.tasksArr);

    this.state = {
      tasks: this.tasksArr,
      value: ''
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleBtnSubmit = this.handleBtnSubmit.bind(this);
  }

  handleValueChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleBtnSubmit(values) {
    const task = new Task(values.name, 'NEW');
    this.tasksArr = tasks.allTasks.push(task);
    console.log(this.tasksArr);
    this.setState({
      tasks: this.tasksArr,
      value: values.name
    });
  }

  render() {

    return (
      <LocalForm
        onSubmit={(values) => this.handleBtnSubmit(values)}
      >
        <label>
          <span>Task name: {this.state.value}</span>
          <br/>
          <Control.text
            className="task-input"
            model=".name"
            value={this.state.value}
            validators={{
              required: (val) => val && !!val.length
            }}
            onChange={this.handleValueChange}
            required/>
          <span className="help-block">
              <Errors
                model=".name"
                messages={{
                  required: 'Write task name'
                }}
              />
            </span>
        </label>
        <input
          type="submit" value="Add task"/>
      </LocalForm>
    )
  }
}
