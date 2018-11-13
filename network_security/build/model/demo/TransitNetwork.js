'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _seq = require('../../database/seq');

var _seq2 = _interopRequireDefault(_seq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 数据表的基本定义。创建的数据表，表名是transitnet0515s

var Model = _seq2.default && _seq2.default.define('transitnet0515', {
  event_id: {
    type: _sequelize2.default.STRING,
    primaryKey: true,
    unique: true
  },
  event_name: _sequelize2.default.TEXT,
  start_time: {
    type: _sequelize2.default.STRING,
    allowNull: true
  },
  end_time: {
    type: _sequelize2.default.STRING,
    allowNull: true
  },
  send_node_id: {
    type: _sequelize2.default.STRING,
    allowNull: true
  },
  send_node_global_id: {
    type: _sequelize2.default.STRING,
    allowNull: true
  },
  receive_node_id: {
    type: _sequelize2.default.STRING,
    allowNull: true
  },
  receive_node_global_id: {
    type: _sequelize2.default.STRING,
    allowNull: true
  },
  val: {
    type: _sequelize2.default.DOUBLE,
    allowNull: true
  }
});

exports.default = Model;