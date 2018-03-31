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
      estimatedTime: values.estimate || 0
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

          <span>Estimated time
            <small>(min)</small>:
          </span>
          <Control
            type="number"
            min="3.0"
            className="task-input"
            model=".estimate"
            />

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
