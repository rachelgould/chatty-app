import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const messageItems = this.props.messages.map(msg => (
      <Message username={msg.username} content={msg.content} key={msg.id}/>
    ));

    return (
      <main className="messages">
        {messageItems}
      </main>
    );
  }
}
export default MessageList;