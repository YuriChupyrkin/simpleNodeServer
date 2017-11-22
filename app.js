console.log('app init...');

const SimpleNodeServer = require('./simpleNodeServer');
const SimpleRouting = require('./simpleRouting');

let simpleRouting = new SimpleRouting();
let requestHander = simpleRouting.buildRequestHander.bind(simpleRouting);
let server = new SimpleNodeServer(requestHander);
server.run();