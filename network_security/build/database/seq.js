'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by xufengchao on 16/9/11.
 * Sequelize Config
 */

var opts = _config2.default.db.sequelize;

var ins = null;

try {
  if (opts) {
    ins = new _sequelize2.default(opts.database, opts.user, opts.password, opts);
  }
} catch (err) {
  throw err;
}

exports.default = ins;