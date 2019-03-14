import React, {Component} from 'react';
import Menu from './MenuBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: {name: 'Bob'},
      socket: new WebSocket('ws://localhost:3001')
    }
    this.socket = this.state.socket;

  }

  componentDidMount() {
    const socket = this.state.socket;
    socket.onopen = event => {
      console.log('Connected to server')
    }
    socket.onmessage = event => {
      let incomingMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(incomingMessage);
      this.setState({messages: messages});
    }
  }

  render() {
    const submitMessage = message => {
      const newMessage = {
        username: message.username || 'Anonymous',
        content: message.content
      }
      this.socket.send(JSON.stringify(newMessage));
    }

    return (
        <div>
          <Menu />
          <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser.name} submitMessage={submitMessage.bind(this)}/>
        </div>
    );
  }
}
export default App;
