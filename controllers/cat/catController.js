const stringify = require('node-stringify');
const BaseController = require('../baseController');

// test controller
module.exports = class CatController extends BaseController {
  constructor () {
    super();
  }

  post (data) {
    this._response.writeHead(
      200,
      {
        'Context-Type': 'application/json'
      }
    );

    
    this. _response.write(stringify(this.getAllCats()));
    this._response.end();
  }

  get (data) {
    this._response.writeHead(
      200,
      {
        'Context-Type': 'application/json'
      }
    );

    this._response.write(stringify(this.getAllCats()));
    this._response.end();
  }

  getAllCats () {
    let cats = {
      cats: [
        {id: 1, name: 'Cat #1'},
        {id: 2, name: 'Cat #2'}
      ]
    };

    return cats;
  }
};