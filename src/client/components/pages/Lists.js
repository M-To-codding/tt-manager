import React, {Component} from 'react';
import tasks from './../task/tasks';
import TasksList from './../task/TasksList';

export default class Lists extends Component {

    render() {
        return (
            <article className="tasks-content">
                <TasksList {...[tasks.completedTasks]} />
            </article>
        )
    }
}
