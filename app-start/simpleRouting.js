const HomeController = require('../controllers/home/homeController');
const CatController = require('../controllers/cat/catController');
const InternalResourcesController = require('../controllers/internalResourcesController');
const SocketChatController = require('../controllers/socketChat/chatController');
const _ = require('lodash');
const url = require('url');

module.exports = class SimpleRouting {
  notFoundPage (request, response) {
    response.writeHead(
      404,
      {
        'Context-Type': 'text/plain'
      }
    );
    response.write('<h1>Page not found</h1>');
    response.end();
  };

  controllerFactory(request, response, controller) {
    let instance = new controller();
    instance.onRequest(request, response);
  }

  checkResourcesRequest (pathName) {
    let lowerCase = pathName.toLowerCase();
    return _.endsWith(lowerCase, '.js') || _.endsWith(lowerCase, '.css');
  }

  buildRequestHander (request, response) {
    const controllerFactory = this.controllerFactory.bind(this, request, response);
    const requestUrl = url.parse(request.url);
    let pathName;

    if (!requestUrl || !requestUrl.pathname) {
      this.notFoundPage(request, response);
    }

    pathName = requestUrl.pathname;

    if (this.checkResourcesRequest(pathName)) {
      console.log(`internal resources url: ${pathName}`);
      new InternalResourcesController().onRequest(request, response);
      return;
    }

    console.log(`request url: ${pathName}`);
    switch (pathName) {
      case '/':
      case '/index':
      case '/home':
        controllerFactory(HomeController);
        break;
      case '/cat':
        controllerFactory(CatController);
        break;
      case '/chat':
        controllerFactory(SocketChatController);
        break;
      default:
        this.notFoundPage(request, response);
    }
  }
}
