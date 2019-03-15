import React, {Component} from 'react';
import Message from './Message.jsx';
import Placeholder from './Placeholder.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const messageItems = this.props.messages.map(msg => (
      <Message username={msg.username} content={msg.content} key={msg.id} type={msg.type} color={msg.color ? msg.color : ''}/>
    ));

    let conditionalClass = this.props.time;

    return (
      <main className={conditionalClass + ' messages'}>
        {messageItems.length > 0 ? messageItems : <Placeholder time={this.props.time} currentUser={this.props.currentUser}/>}
      </main>
    );
  }
}
export default MessageList;