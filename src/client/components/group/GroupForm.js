import React, {Component} from 'react';
import {LocalForm, Control, Errors} from 'react-redux-form';
import moment from 'moment';

import Group from "./Group";

export default class GroupForm extends Component {

  constructor(props) {
    super(props);

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
    let tasks = values.tasks;

    let group = new Group({
      name: values.name,
      tasks: tasks || 'Tasks not exists',
      time: this.currentDate.format('h:mm:ss'),
      date: this.currentDate.format('DD.MM.YYYY')
    });
    this.setState({
      value: ''
    });

    console.log(JSON.stringify(group));

    fetch('/api/v1/lists/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(group)
    }).then(function () {
      console.log('add');
    });
  }

  render() {

    return (
      <div className="form-block">
        <LocalForm
          onSubmit={(values) => this.handleBtnSubmit(values)}
          className="create-group-form"
        >
          <h3 className="form-title">Create new group</h3>
          <div className="form-control">

            <span>Group name:</span>
            <Control.text
              className="group-input"
              model=".name"
              value={this.state.value}
              validators={{
                required: (val) => val && !!val.length
              }}
              onChange={this.handleValueChange}
              required/>
            <Errors
              model=".task"
              className="help-block"
              messages={{
                required: 'Write group name'
              }}
            />
            <input
              type="submit" value="Create group" className="create-group"/>
          </div>
        </LocalForm>
      </div>
    )
  }
}
