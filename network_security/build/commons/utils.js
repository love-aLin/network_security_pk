'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logs = exports.getCompleteUrl = exports.getCompleteHost = exports.resJsonMaker = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by huangxinxin on 16/9/13.
 */
var resJsonMaker = function resJsonMaker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$data = _ref.data,
      data = _ref$data === undefined ? '' : _ref$data,
      _ref$msg = _ref.msg,
      msg = _ref$msg === undefined ? '' : _ref$msg,
      _ref$err = _ref.err,
      err = _ref$err === undefined ? false : _ref$err,
      _ref$json = _ref.json,
      json = _ref$json === undefined ? false : _ref$json;

  if (json && data) {
    try {
      data = JSON.parse(JSON.stringify(data));
    } catch (err) {
      console.log('resJsonMaker', err);
    }
  }
  return {
    data: data || '', message: msg, error: err
  };
};

var getCompleteHost = function getCompleteHost(req) {
  var arr = [req.protocol, '://', req.hostname];
  if (_config2.default.port) {
    arr.push(':' + _config2.default.port);
  }
  return arr.join('');
};

var getCompleteUrl = function getCompleteUrl(req) {
  return getCompleteHost(req) + req.originalUrl;
};

var logs = function logs(prefix) {
  if (prefix) {
    prefix = '[' + prefix + ']';
  }
  return function (msg, err) {
    var args = [(0, _moment2.default)().format(_config2.default.time.formatStr) + ' ' + prefix + ' => {\n'];
    if (msg) {
      args.push(msg);
    }
    if (err) {
      args.push('\n Error(\n', err, '\n )');
    }
    args.push('\n}\n');
    console.log.apply(console, args);
  };
};

exports.resJsonMaker = resJsonMaker;
exports.getCompleteHost = getCompleteHost;
exports.getCompleteUrl = getCompleteUrl;
exports.logs = logs;