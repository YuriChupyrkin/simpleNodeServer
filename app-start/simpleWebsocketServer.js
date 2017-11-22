const socket = require('socket.io');

module.exports = class SimpleWebsocketServer {
  constructor (httpServer) {
    this._httpServer = httpServer;
    this._messages = [{
      name: 'Administrator',
      message: 'Welcome to websocket chat'
    }];
    this._chatActionName = 'chat-message';
  }

  run () {
    let io = new socket(this._httpServer);
    io.on('connection', this.onConnection.bind(this));
    this._ioServer = io;
  }

  onConnection (socket) {
    console.log('websocket server: onConnection');
    socket.on(this._chatActionName, this.onMessage.bind(this));
    this.sendPrevMessages(socket);
  }

  onMessage (data) {
    // save message
    this._messages.push(data);

    // send to clients
    this.sendMessageToAll(data);
  }

  sendMessageToAll (message, socket) {
    if (socket) {
      // send only to one socket
      socket.emit(this._chatActionName, message);
    } else {
      // send to all
      this._ioServer.sockets.emit(this._chatActionName, message);
    }
  }

  sendPrevMessages (socket) {
    let messages = this._messages;
    if (!messages || !messages.length) {
      return;
    }

    let length = messages.length;
    // send only last 10 messages
    let lastMessages = messages.slice(length > 10 ? -10 : -length);

    lastMessages.forEach((message) => {
      this.sendMessageToAll(message, socket);
    });
  }
}

