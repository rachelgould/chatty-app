import React, {Component} from 'react';
import Menu from './MenuBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "0101"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "0102"
        }
      ],
      currentUser: {name: 'Bob'}
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    const submitMessage = (message) => {
      const newMessage = {
        id: message.id,
        username: message.username,
        content: message.content
      }
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
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
