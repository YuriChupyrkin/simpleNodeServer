const fs = require('fs');
const BaseController = require('../baseController');

module.exports = class ChatController extends BaseController {
  constructor () {
    super();
    this._htmlPath = './html/socketChat/chat.html';
  }

  get (data) {
    this._response.writeHead(
      200,
      {
        'Context-Type': 'text/html'
      }
    );
    fs.createReadStream(this._htmlPath).pipe(this._response);
  }
};