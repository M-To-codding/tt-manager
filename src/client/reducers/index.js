import { combineReducers } from 'redux';
import tasks from './tasks';


const tasksManager = combineReducers({
  tasks
});

export default tasksManager;