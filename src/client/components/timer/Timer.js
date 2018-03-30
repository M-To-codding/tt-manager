import React, {Component} from 'react';

import TimerHandler from './TimerHandler';

export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      taskId: props.taskId,
      time: {}
    }
    this.timer = TimerHandler.create({id: this.state.taskId, callback: (time) => this.updateTime(time)});

  }

  updateTime(time) {
    this.setState({time: time})
  }

  render() {
    return (
      <div>
        <button className="timer-btn -black-bg" onClick={() => this.timer.start()}>{this.state.time.seconds || 'Start'}</button>
        <button className="reset-timer -red-bg" onClick={() => this.timer.stop()}>stop</button>
      </div>
    )
  }
}
