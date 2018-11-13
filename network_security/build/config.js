'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _errorCode = require('./errorCode');

var _errorCode2 = _interopRequireDefault(_errorCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localConfig = require('../local.config').server;
var onlineConfig = require('../online.config');
var isPro = process.env.NODE_ENV === 'production';
var runningConfig = isPro ? onlineConfig : localConfig;

exports.default = Object.assign({
  errorCode: _errorCode2.default,
  pro: isPro,
  path: {
    base: __dirname,
    logs: '../logs',
    public: '../public',
    views: '../public',
    favicon: '../public/favicon.png',
    get logsAbs() {
      return _path2.default.resolve(this.base, this.logs);
    },
    get publicAbs() {
      return _path2.default.resolve(this.base, this.public);
    },
    get viewsAbs() {
      return _path2.default.resolve(this.base, this.views);
    },
    get faviconAbs() {
      return _path2.default.resolve(this.base, this.favicon);
    }
  },
  secheme: 'http', // 服务类型
  limit: '50mb', // 请求字节限制
  // session
  session: {
    table: 'Session',
    status: 'off', // 开启 on, 关闭 off
    secret: '~Yoursecret~',
    checkExpirationInterval: 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 3 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
  },
  time: {
    formatStr: 'YYYY-MM-DD HH:mm:ss'
  },
  app: {
    title: 'Your App Title'
  }
}, runningConfig);