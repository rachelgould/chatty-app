import React, {Component} from 'react';

class Message extends Component {
  render() {
    let {username, content, type, color} = this.props;
    let divClass;
    let spanContentClass;
    let customStyle = {};
    switch (type) {
      default:
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
      case 'help':
        divClass = type;
        spanContentClass = 'help-content';
        break;
    }
    // If there's a custom color set, set the style object for it
    if (color) {
      customStyle.color = color;
    }
    console.log(customStyle);
    return (
      <div className={divClass}>
      {/* If there's a username, add the username span tag */}
        {username ? <span style={customStyle} className="message-username">{username}</span> : ''}
        <span className={spanContentClass}>{type === 'gif' ? <img src={content} alt="gif" /> : content}</span>
      </div>
    );
  }
}
export default Message;