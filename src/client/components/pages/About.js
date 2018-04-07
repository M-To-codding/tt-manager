import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      img: document.querySelector('.city-bg')
    };
  }

  render() {

    return (
      <div className="about-project-page">
        <h1 className="title">Task Time Manager</h1>
      </div>
    )
  }

}
