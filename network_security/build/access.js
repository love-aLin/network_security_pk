'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _fileStreamRotator = require('file-stream-rotator');

var _fileStreamRotator2 = _interopRequireDefault(_fileStreamRotator);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  var accessLogDirectory = _config2.default.path.logsAbs;
  _fs2.default.existsSync(accessLogDirectory) || _fs2.default.mkdirSync(accessLogDirectory);
  var accessLogStream = _fileStreamRotator2.default.getStream({
    filename: _path2.default.join(accessLogDirectory, 'Access-%DATE%.log'),
    date_format: 'YYYY-MM-DD',
    frequency: 'daily',
    verbose: false
  });
  app.use((0, _morgan2.default)('combined', { stream: accessLogStream }));
}; /**
    * Created by huangxinxin on 16/7/11.
    * Access Log
    */