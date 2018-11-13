'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by xufengchao on 16/9/11.
 * Mysql Config
 */

var opts = _config2.default.db.mysql;

console.log('test', opts);

var ins = null;

try {
  if (opts) {
    ins = _mysql2.default.createPool(opts);
  }
} catch (err) {
  throw err;
}

exports.default = ins;