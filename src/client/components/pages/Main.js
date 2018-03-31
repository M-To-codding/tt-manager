import React, {Component} from 'react';
import TasksList from './../task/TasksList';
import TasksForm from '../task/TasksForm';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.routeName = 'main';
  }

  render() {

    return (
      <div className="main-page">
        <article className="tasks-content">

          <main>
            <TasksForm/>
            <TasksList {...[this.routeName]} />
          </main>

        </article>
      </div>
    )
  }

}
