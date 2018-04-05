import React, {Component} from 'react';

import TimerHandler from './TimerHandler';

export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routeName: props.routeName,
      taskId: props.taskId,
    }
    this.timer = TimerHandler.create({
      id: this.state.taskId,
      callback: (time) => this.updateTime(time),
      seconds: this.props.time
    });

  }

  updateTime(time) {
    this.props.onUpdate(time.seconds);
  }

  saveTime(time) {
    console.log(this.state);
    fetch(`/api/v1/${this.state.routeName}/${this.state.taskId}`, {
      method: 'PUT',
      mode: 'CORS',
      body: JSON.stringify({progressTime: this.props.time.toString()}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    return (
      <div className="timer">
        S. time:
        <button className="timer-btn -transp-bg"
                onClick={() => this.timer.start()}><b>{this.props.time || 'Start'}</b></button>
        <button className="stop-timer -red-bg" onMouseDown={() => this.saveTime(this.state.time)}
                onClick={() => this.timer.stop()}><b>stop</b>
        </button>
      </div>
    )
  }
}
