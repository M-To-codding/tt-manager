import React, {Component} from 'react';
import tasks from './../task/tasks';
import TasksList from './../task/TasksList';
import TasksForm from '../task/TasksForm';

export default class Main extends Component {

    render() {

        return (
            <div className="main-page">
                <article className="tasks-content">
                    <TasksList {...[tasks.allTasks]} />

                    <main>
                        <TasksForm/>
                    </main>
                </article>
            </div>
        )
    }

}
