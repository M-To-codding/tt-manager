import React, {Component} from 'react';
import TasksList from './../task/TasksList';

export default class InWork extends Component {

  constructor(props) {
    super(props);
    this.routeName = 'inWork';
  }

    render() {
        return (
            <article className="tasks-content">
                <TasksList {...[this.routeName]} />
            </article>
        )
    }
}
