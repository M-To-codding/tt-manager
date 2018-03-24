import React, {Component} from 'react';

import setTime from './timerActions';

export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTimerOn: false
    }
  }

  handleTimerOn() {
    this.setState({
      isTimerOn: true
    });
    setTime();
  }

  handleTimerOff() {
    this.setState({
      isTimerOn: false
    })
  }

  render() {
    const timerBtn = this.state.isTimerOn ? (
      <div className="timer" onClick={this.handleTimerOff.bind(this)}>0:00</div>
    ) : (
      <div className="timer" onClick={this.handleTimerOn.bind(this)}>0:00</div>
    )

    return (
      <article>
        {/*{timerBtn}*/}
        <button className="timer" onClick={setTime}>0:00</button>
      </article>
    )
  }
}
