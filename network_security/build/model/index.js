'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitNetwork = exports.Car = exports.Person = exports.Session = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../commons/utils');

var _seq = require('../database/seq');

var _seq2 = _interopRequireDefault(_seq);

var _Session = require('./Session');

var _Session2 = _interopRequireDefault(_Session);

var _Person = require('./demo/Person');

var _Person2 = _interopRequireDefault(_Person);

var _Car = require('./demo/Car');

var _Car2 = _interopRequireDefault(_Car);

var _TransitNetwork = require('./demo/TransitNetwork');

var _TransitNetwork2 = _interopRequireDefault(_TransitNetwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _logs = (0, _utils.logs)('Model');

// 初始化模型之间的关系


// demo
/**
 * Created by xufengchao on 16/9/11.
 * Models
 */

var initRelations = function initRelations() {
  return new Promise(function (resolve, reject) {
    try {
      // todo relations
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

// 初始化所有模型
var initSync = function initSync() {
  var syncForce = _config2.default.db.sequelize && _config2.default.db.sequelize.syncForce;
  _logs('Force:' + syncForce);
  return _seq2.default.sync({ force: syncForce });
};

_seq2.default && _seq2.default.authenticate().then(initRelations).then(initSync).catch(function (error) {
  _logs('Model建立失败', error);
  throw new Error('Model建立失败');
});

exports.Session = _Session2.default;
exports.Person = _Person2.default;
exports.Car = _Car2.default;
exports.TransitNetwork = _TransitNetwork2.default;