import React, {Component} from 'react';
import messages from './messages-sample.json';


class MessageItem extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}

class NotificationItem extends Component {
  render() {
    return (
      <div className="message system">
      {this.props.message.content}
      </div>
    );
  }
}

const chatMessages = messages.filter(message => {
  return message.type === 'incomingMessage'
});
const notifications = messages.filter(message => {
  return message.type === 'incomingNotification'
});

class Message extends Component {
  constructor() {
    super();
    this.state = { chatMessages: chatMessages, notifications: notifications };
  }
  render() {
    const messageItems = this.state.chatMessages.map(msg => (
      <MessageItem message={msg} />
    ));
    const alerts = this.state.notifications.map(msg => (
      <NotificationItem message={msg} />
    ))
    return (
      <div>
        {messageItems}
        {alerts}
      </div>
    );
  }
}
export default Message;