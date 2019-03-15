// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const GphApiClient = require('giphy-js-sdk-core');
const gifAPI = require('./secrets.js');
let client = GphApiClient(gifAPI.API);

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
  welcomeMsg = {
    id: uuid(),
    content: `Welcome! Here are some things you can do with this app: Try changing your username color! Type "/setcolor" and then a color in plain text or a hex code! You can also send gifs by typing "/gif" and then a search term.`,
    type: 'help'
  }
  ws.send(JSON.stringify(outgoingMsg));
  ws.on('message', (msg) => {
    let msgRaw = JSON.parse(msg);
    let outgoingMsg;
    let commandOption;
    let sync = true;
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
      // Prevent broadcast from being sent if it's a slash command (handle asynchronously)
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
        outgoingMsg = {
          id: uuid(),
          content: 'Try changing your username color! Type "/setcolor" and then a color in plain text or a hex code! You can also send gifs by typing "/gif" and then a search term.',
          type: 'help'
        }
        ws.send(JSON.stringify(outgoingMsg));
        break;
      case 'gif':
        let matchingGIFs = [];
        let randomMatch;
        client.search('gifs', {"q": commandOption})
        .then((response) => {
          response.data.forEach((gifObject) => {
            matchingGIFs.push(gifObject.images.fixed_width.url);
          })
          randomMatch = matchingGIFs[Math.floor(Math.random() * (matchingGIFs.length - 1))];
          outgoingMsg = {
            id: uuid(),
            username: msgRaw.username,
            content: randomMatch,
            type: msgRaw.type,
            color: userColor
          }
          wss.broadcast(JSON.stringify(outgoingMsg));
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        })
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

// Broadcast to all clients when there's a new message
wss.broadcast = incomingMsg => {
wss.clients.forEach(client => {
  if (client.readyState === 1) {
    client.send(incomingMsg);
  }
})
}