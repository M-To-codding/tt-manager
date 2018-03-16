import React, {Component} from 'react';
import tasks from './../task/tasks';
import TasksList from './../task/TasksList';

export default class InWork extends Component {

    render() {
        return (
            <article className="tasks-content">
                <TasksList {...[tasks.processingTasks]} />
            </article>
        )
    }
}
