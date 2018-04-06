import React, {Component} from 'react';

export default class ProgressBar extends Component {
  validateValues(props) {
    this.percentage = '0%';

    return {
      total: parseInt(props.total),
      progress: parseInt(props.progress)
    }
  }

  calculateProgressStyle(props) {
    const {total, progress} = this.validateValues(props);

    const color = progress > total ? 'red' : 'green';
    const width = Math.trunc((progress / total) * 100);
    this.percentage = width + '%';

    return {
      background: color,
      width: width + '%'
    }
  }
  render() {
    return (
      <div className="progress-bar">
        <div className="frame">
          <div className="progress" style={this.calculateProgressStyle(this.props)}>
            <p>{this.percentage}</p>
            </div>
        </div>
      </div>
    );
  }
}
