import React from 'react';
import ReactDOM from 'react-dom';
import './client/styles/index.css';
import App from './client/components/App';
import registerServiceWorker from './client/components/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
