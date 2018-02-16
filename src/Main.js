import React, {Component} from 'react';
import TasksForm from './TasksForm';

export default class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="main-page">
        <main>
          <TasksForm/>
        </main>
      </div>
    )
  }

}
