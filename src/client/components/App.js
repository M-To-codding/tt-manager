import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Lists from './pages/Lists';
import InWork from './pages/InWork';
import Main from './pages/Main';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="router-content">
          <header>
            <nav>
              <ul>

                <li>
                  <Link to="/main">Main</Link>
                </li>

                <li>
                  <Link to="/inWork">In work</Link>
                </li>

                <li>
                  <Link to="/lists">Lists</Link>
                </li>

              </ul>
            </nav>
          </header>

          <main>

            <Route
              path="/main"
              component={Main}
            />

            <Route
              path="/inWork"
              component={InWork}
            />

            <Route
              path="/lists"
              component={Lists}
            />

          </main>
        </div>
      </Router>
    );
  }
}

export default App;
