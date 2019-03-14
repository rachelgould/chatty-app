import React, {Component} from 'react';
import Menu from './MenuBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: {name: 'Anonymous'},
      time: new Date().getHours(),
      socket: new WebSocket('ws://localhost:3001'),
      numUsers: 1
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
      
      if (incomingMessage.type === 'displayNone') {
        this.setState({numUsers: incomingMessage.userCount});
      } else {
        const messages = this.state.messages.concat(incomingMessage);
        this.setState({messages: messages});
      }
    }
  }

  render() {
    const submitMessage = message => {
      const newMessage = {
        username: message.username || 'Anonymous',
        content: message.content,
        type: 'message'
      }
      this.socket.send(JSON.stringify(newMessage));
    }

    const changeCurrentUser = username => {
      const oldUser = this.state.currentUser.name;
      const newUser = username;
      const messageToServer = {
        content: `${oldUser} changed their username to ${newUser}...`,
        type: 'globalNotification'
      }
      if (oldUser !== newUser) {
        this.socket.send(JSON.stringify(messageToServer));
        this.setState({currentUser: {name: username}});
      }
    }

    let currentHour = this.state.time;
    let timeOfDay;
    if (currentHour >= 16) {
      timeOfDay = 'night';
    } else if (currentHour >= 12) {
      timeOfDay = 'afternoon';
    } else {
      timeOfDay = 'morning';
    }

    return (
        <div>
          <Menu users={this.state.numUsers}/>
          <MessageList messages={this.state.messages} time={timeOfDay} currentUser={this.state.currentUser.name}/>
          <ChatBar currentUser={this.state.currentUser.name} submitMessage={submitMessage.bind(this)} changeCurrentUser={changeCurrentUser}/>
        </div>
    );
  }
}
export default App;
