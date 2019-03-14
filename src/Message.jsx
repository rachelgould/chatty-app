import React, {Component} from 'react';

class Message extends Component {
  render() {
    let {username, content, type} = this.props;
    let divClass;
    let spanContentClass;
    switch (type) {
      case 'message':
        divClass = type;
        spanContentClass = 'message-content';
        break;
      case 'globalNotification':
        divClass = 'notification';
        spanContentClass = 'notification-content';
        break;
      case 'error':
        divClass = type;
        spanContentClass = 'error-content';
        break;
    }
    return (
      <div className={divClass}>
      {/* If there's a username, add the username span tag */}
        {username ? <span className="message-username">{username}</span> : ''}
        <span className={spanContentClass}>{content}</span>
      </div>
    );
  }
}
export default Message;