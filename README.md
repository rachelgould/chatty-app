# Chatty App - Lighthouse Labs Assignment

Lightweight single-page chat app built with ReactJS in Node. The client-side app communicates with a server via WebSockets for multi-user real-time updates.

Built using the provided [React Simple Boilerplate](https://github.com/lighthouse-labs/react-simple-boilerplate).

## Screenshots



## Installation and Startup:

The repository contains both the front-end application in `chatty-app/` and the server in `chatty-app/chatty_server/`. After cloning the repository, install dependencies:

```
chatty-app/ $ npm i
...
chatty-app/chatty_server $ npm i
```

Start both servers:

```
chatty-app/ $ npm start  // (localhost:3000)
...
chatty-app/chatty_server $ npm start  // (localhost:3001)
```

Then connect to the client in your browser at: http://localhost:3000/

## Features

### Core Project Requirements

* When any connected user sends a chat message, all connected users receive and display the message
* When any connected user changes their name, all connected users are notified of the name change
* Notifications are styled differently from chat messages
* Header will display the count of connected users
* When the number of connected users changes, this count will be updated for all connected users

### Bonus Features

Here are some other things that I added to make this project my own:

* Custom CSS
* 3 Themes that are automatically applied depending on the time of day
* Placeholder text before the client has received messages (randomly shows 1 of 10 conversation starters)
* User is greeted by the server upon receiving their first notification, and told about app features
* Support for `/setcolor` command in the chat bar, which allows users to change their username color. (E.g. `/setcolor red` or `/setcolor #006699`)
* Giphy API: users can enter `/gif query` in the chat bar, where query will be sent to the Giphy API. The server will randomly send back one of the returned gifs to be displayed in the browser
* `/help` shows a list of commands

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
