console.log('app init...');

const SimpleNodeServer = require('./app-start/simpleNodeServer');
const SimpleRouting = require('./app-start/simpleRouting');

let simpleRouting = new SimpleRouting();
let requestHander = simpleRouting.buildRequestHander.bind(simpleRouting);
let server = new SimpleNodeServer(requestHander);
server.run();