import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './client/styles/index.css';
import App from './client/components/App';
import registerServiceWorker from './client/components/registerServiceWorker';
import reducer from './client/reducers';


const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
