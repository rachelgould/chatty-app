import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: ''
    }
  }
  render() {
    const usernameContent = (event) => {
      this.setState({ username: event.target.value });
    }
    const sendUpNewUsername = event => {
      if (event.key === 'Enter') {
        let newUsername = this.state.username;
        if (newUsername === '') {
          this.props.changeCurrentUser('Anonymous')
        } else {
          this.props.changeCurrentUser(event.target.value);
        }
      }
    }
    const chatMessageContent = (event) => {
      this.setState({ content: event.target.value });
    }
    const chatMessageSubmit = (event) => {
      if (event.key === 'Enter') {
        let message = {
          username: this.state.username,
          content: this.state.content
        };
        this.props.submitMessage(message)
        this.setState({ content: '' });
      }
    }
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.username} onChange={usernameContent} onKeyPress={sendUpNewUsername}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={chatMessageContent} onKeyPress={chatMessageSubmit} />
      </footer>
    );
  }
}
export default ChatBar;