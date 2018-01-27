import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Archive from './Archive';
import Active from './Active';
import Backlog from './Backlog';


class App extends Component {
    render() {
        return (
            <Router>
                <div className="router-content">
                    <header>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/backlog">Backlog</Link>
                                </li>
                                <li>
                                    <Link to="/active">Active</Link>
                                </li>
                                <li>
                                    <Link to="/archive">Archive</Link>
                                </li>
                            </ul>
                        </nav>
                    </header>

                    <main>
                        <Route
                            path="/backlog"
                            component={Backlog}
                        />
                        <Route
                            path="/active"
                            component={Active}
                        />
                        <Route
                            path="/archive"
                            component={Archive}
                        />
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
