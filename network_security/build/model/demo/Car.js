'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _seq = require('../../database/seq');

var _seq2 = _interopRequireDefault(_seq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _seq2.default && _seq2.default.define('car', {
  id: {
    type: _sequelize2.default.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  name: _sequelize2.default.STRING,
  description: {
    type: _sequelize2.default.TEXT,
    allowNull: true
  }
});

exports.default = Model;