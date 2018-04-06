import React, {Component} from 'react';

import TasksList from './../task/TasksList';
import GroupForm from '../group/GroupForm';
import GroupsList from '../group/GroupsList';

export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.routeName = 'lists';
  }

  render() {
    return (
      <article className="tasks-content">
        <GroupForm />
        <GroupsList />
        <TasksList {...[this.routeName]} />
      </article>
    )
  }
}
