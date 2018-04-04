import React, {Component} from 'react';
import {LocalForm, Control, Errors} from 'react-redux-form';
import moment from 'moment';

import Task from "./Task";

export default class TasksForm extends Component {

  constructor(props) {
    super(props);

    this.tasksArr = [];
    this.currentDate = moment();
    moment.locale('ru');

    this.state = {
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

    console.log(values.estimate);

    let task = new Task({
      name: values.name,
      status: 'NEW',
      time: this.currentDate.format('h:mm:ss'),
      date: this.currentDate.format('DD.MM.YYYY'),
      progressTime: 0,
      estimatedTime: values.estimate || 0,
      description: values.description || ''
    });
    this.setState({
      value: ''
    });

    console.log(JSON.stringify(task));

    fetch('/api/v1/main/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    }).then(function () {
      console.log('add');
    });
  }

  toggleShowForm(event) {

  }

  render() {

    return (
      <LocalForm
        onSubmit={(values) => this.handleBtnSubmit(values)}
        onClick={(event) => this.toggleShowForm(event)}
        className="create-task-form"
      >
        <h3 className="form-title">Create new task</h3>
        <div className="form-control">

          <span>Task name:</span>
          <p className="task-name-preview">{this.state.value}</p>

          <Control.text
            className="task-input"
            model=".name"
            value={this.state.value}
            validators={{
              required: (val) => val && !!val.length
            }}
            onChange={this.handleValueChange}
            required/>
          <Errors
            model=".name"
            className="help-block"
            messages={{
              required: 'Write task name'
            }}
          />
        </div>
        <div className="form-control">
        <span> Add description:
          </span>
          <Control.textarea
            className="task-input -textarea"
            model=".description"
          />
        </div>
        <div className="form-control">
          <p>Estimated time:
          </p>
          <p className="-estimate">
            <small>(hours)</small>
            <Control
              type="number"
              min="3.0"
              className="task-input"
              model=".estimate"
            />
          </p>
          <p className="-estimate">
            <small>(min)</small>
            <Control
              type="number"
              min="3.0"
              className="task-input"
              model=".estimated-min"
            />
          </p>
        </div>
        <input
          type="submit" value="Add task" className="add-task"/>
      </LocalForm>
    )
  }
}
