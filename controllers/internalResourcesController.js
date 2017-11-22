const fs = require('fs');
const BaseController = require('./baseController');

module.exports = class InternalResourcesController extends BaseController {
  constructor () {
    super();
  }

  get (data) {
    const pathName = this._pathName;
    // fix me
    const fullPath = `.${pathName}`;

    this._response.writeHead(
      200,
      {
        'Context-Type': 'text/javascript'
      }
    );

    fs.createReadStream(fullPath).pipe(this._response);
  }
};