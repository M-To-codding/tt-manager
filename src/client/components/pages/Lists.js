import React, {Component} from 'react';
import TasksList from './../task/TasksList';

export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.routeName = 'lists';
  }

    render() {
        return (
            <article className="tasks-content">
                <TasksList {...[this.routeName]} />
            </article>
        )
    }
}
