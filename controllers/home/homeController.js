const fs = require('fs');
const BaseController = require('../baseController');

module.exports = class HomeController extends BaseController {
  constructor () {
    super();
    this._htmlPath = './html/home/home.html';
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