// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let connectedUsers = 0;

const incrementConnectedUsers = () => {
  connectedUsers ++;
  wss.broadcast(JSON.stringify({
    type: 'userCounterChange',
    userCount: connectedUsers
  }));
  return connectedUsers;
}

const decrementConnectedUsers = () => {
  connectedUsers --;
  wss.broadcast(JSON.stringify({
    type: 'userCounterChange',
    userCount: connectedUsers
  }));
  return connectedUsers;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  incrementConnectedUsers();
  let userColor = '#E8E9EB';
  const changeUserColor = color => {
    userColor = color;
    return userColor;
  }
  ws.on('message', (msg) => {
    let msgRaw = JSON.parse(msg);
    let outgoingMsg;
    let commandOption;
    let sync = true;
    // If the message is a slash command
    if (msgRaw.type === 'command') {
      let { content } = msgRaw;
      // Set the type of message equal to that command, and store the remaining content
      if (content.indexOf(' ') === -1) {
        // In this case there's nothing after the initial slash command
        msgRaw.type = content.slice(1).toLowerCase();
      } else {
        msgRaw.type = content.slice(1, content.indexOf(' ')).toLowerCase();
      }
      commandOption = content.slice(content.indexOf(' ') + 1).toLowerCase();
      sync = false;
    }
    switch(msgRaw.type) {
      case 'message':
        outgoingMsg = {
          id: uuid(),
          username: msgRaw.username,
          content: msgRaw.content,
          type: msgRaw.type,
          color: userColor
        }
        break;
      case 'globalNotification':
        outgoingMsg = {
          id: uuid(),
          content: msgRaw.content,
          type: msgRaw.type
        }
        break;
      case 'setcolor':
        changeUserColor(commandOption);
        outgoingMsg = {
          id: uuid(),
          content: `You changed your color to ${userColor}.`,
          type: 'globalNotification'
        }
        ws.send(JSON.stringify(outgoingMsg));
        break;
      case 'help':
        break;
      case 'settheme':
        break;
      case 'gif':
        break;
      default:
        outgoingMsg = {
          id: uuid(),
          content: 'Sorry, that command doesn\'t exist. Type /help to get a list of valid commands.',
          type: 'error'
        }
        ws.send(JSON.stringify(outgoingMsg));
        break;
    }
    if (sync) {
      wss.broadcast(JSON.stringify(outgoingMsg));
    }
  });
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    decrementConnectedUsers();
  });
});

// Broadcasts to all clients when there's a new message
wss.broadcast = incomingMsg => {
wss.clients.forEach(client => {
  if (client.readyState === 1) {
    client.send(incomingMsg);
  }
})
}