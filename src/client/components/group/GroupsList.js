import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';


export default class GroupsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      tasks: []
    };

    this.getAllGroups();
  }

  getAllGroups() {
    fetch(`/api/v1/lists/groups`)
      .then((res) => res.json())
      .then((data) => this.setState({
        groups: data.groups
      }))

  }

  removeGroup(e, group) {

    let confirmed = window.confirm('Confirm delete group ' + group.name),
      groupId = group._id;

    if (!confirmed) {
      return;
    } else {
      fetch(`/api/v1/lists/delete/${groupId}`, {
        method: 'DELETE',
        body: JSON.stringify({group: group}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
        .then((data) => this.setState({
            groups: data.groups
          })
        );
      console.log('Deleted!');
    }
  }

  render() {

    let listItems = '';

    if (!this.state.groups) {
      listItems = <li className="group-info"> Groups not exists</li>;
    } else {

      listItems = this.state.groups.map((group, index) =>
        <li key={group._id} className="group-item">
          <Link to={`/group/${group._id}`}>
            <div className="group-info">

              <div className="form-group">
                <img src="http://icons.iconarchive.com/icons/media-design/hydropro-v2/512/Folder-icon.png"
                     alt="rename" className="group-icon"/>
                <span className="group-name">{group.name}</span>
              </div>

            </div>
            <div className="date-time">
              <small>{group.time},</small>
              <small>{group.date}</small>
            </div>

            <div className="delete-elem" onClick={(event) => this.removeGroup(event, group)}>
              &#215;
            </div>
          </Link>
        </li>
      )

    }

    return (

        <ul className={'group-list'}>{listItems}
        </ul>
    )
  }

}
