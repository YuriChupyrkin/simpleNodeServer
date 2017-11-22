
$(document).ready(function () {
  console.log('chat ready...');
  const chatActionName = 'chat-message';
  const socket = io.connect('http://localhost:8888');

  const messagesBlock = $('body').find('.chat-messages');
  const userNameInput = $('body').find('.chat-name');
  const messageInput = $('body').find('.chat-message');
  const sendButton = $('body').find('.chat-send-button');

  sendButton.on('click', sendMessage);
  socket.on(chatActionName, onReceiveMessage);

  // press enter key
  $(document).keypress(function(e) {
    if (e.which == 13) {
      sendMessage();
    }
  });

  function sendMessage () {
    let message = messageInput.val();
    let userName = userNameInput.val();

    if (!userName || !message) {
      return;
    }

    socket.emit(chatActionName, {
      name: userName,
      message: message
    });

    messageInput.val('');
  }

  function onReceiveMessage (data) {
    let name = data.name;
    let message = data.message;
    let messageItem =
      `<div class="chat-message-item">
        <span class="chat-message-item-name">${name}</span>
        :
        <span class="chat-message-item-message">${message}</span>
      </div>`;

    messagesBlock.append(messageItem);
    messagesBlock.scrollTop(messagesBlock.get(0).scrollHeight);
  }
});
