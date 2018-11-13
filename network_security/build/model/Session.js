'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _seq = require('../database/seq');

var _seq2 = _interopRequireDefault(_seq);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = null; /**
                   * Created by huangxinxin on 16/9/18.
                   */


try {
  if (_config2.default.session.status === 'on') {
    if (_seq2.default) {
      Model = _seq2.default.define(_config2.default.session.table, {
        sid: {
          type: _sequelize2.default.STRING,
          primaryKey: true
        },
        expires: _sequelize2.default.DATE,
        data: _sequelize2.default.TEXT
      }, {
        tableName: _config2.default.session.table,
        timestamps: true
      });
    } else {
      throw new Error('启用Session失败，未找到DB实例');
    }
  }
} catch (err) {
  throw err;
}

exports.default = Model;