import { combineReducers } from 'redux';
import tasks from './tasks';
import { combineForms } from 'react-redux-form';

const initialTask = {
    name: '',
    status: 'NEW',
};


const tasksManager = combineReducers({
    tasks: tasks,
    deep: combineForms({
        task: initialTask,
    })
});

export default tasksManager;