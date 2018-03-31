import React, {Component} from 'react';

import TimerHandler from './TimerHandler';

export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routeName: props.routeName,
      taskId: props.taskId,
      time: {seconds: props.progressTime}
    }
    this.timer = TimerHandler.create({id: this.state.taskId, callback: (time) => this.updateTime(time), seconds: this.state.time.seconds});

  }

  updateTime(time) {
    this.setState({time: time});
  }

  saveTime(time) {

    console.log(time.seconds);

    console.log(this.state);
    fetch(`/api/v1/${this.state.routeName}/${this.state.taskId}`, {
      method: 'PUT',
      mode: 'CORS',
      body: JSON.stringify({progressTime: time.seconds.toString()}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    return (
      <div className="timer">
        <button className="timer-btn -gray-bg"
                onClick={() => this.timer.start()}>{this.state.time.seconds || 'Start'}</button>
        <button className="reset-timer -red-bg" onMouseDown={() => this.saveTime(this.state.time)} onClick={() => this.timer.stop()}>stop</button>
      </div>
    )
  }
}
