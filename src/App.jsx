import React, {Component} from 'react';
import Menu from './MenuBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  render() {
    return (
        <div>
          <Menu />
          <MessageList />
          <ChatBar />
        </div>
    );
  }
}
export default App;
