'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _app = require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module dependencies.
 */

var port = _app.app.get('port');
var apiPort = _app.app.get('apiPort');

/**
 * Event listener for HTTP server "error" event.
 */
var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.log(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
var onListening = function onListening() {
  console.log('访问地址: ' + _config2.default.secheme + '://' + _config2.default.host + ':' + port + '/');
  console.log('APIDoc: ' + _config2.default.secheme + '://' + _config2.default.host + ':' + apiPort + '/');
};

/**
 * Create HTTP server.
 */
_app.server.listen(port);
_app.server.on('error', onError);
_app.server.on('listening', onListening);

/**
 * API Server in dev env
 **/
if (!_config2.default.pro) {
  _http2.default.createServer(function (request, response) {
    try {
      var requestUrl = _url2.default.parse(request.url).pathname;
      if (requestUrl === '/') {
        requestUrl = '/index.html';
      }
      response.writeHead(200);
      var fileStream = _fs2.default.createReadStream(_path2.default.join(_config2.default.path.base, '/bin/apidoc', requestUrl));
      fileStream.pipe(response);
      fileStream.on('error', function (e) {
        response.writeHead(404); // assume the file doesn't exist
        response.end();
      });
    } catch (e) {
      response.writeHead(500);
      response.end();
    }
  }).listen(apiPort);
}