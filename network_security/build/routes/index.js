'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _createRoute = require('../commons/createRoute');

var _createRoute2 = _interopRequireDefault(_createRoute);

var _demoMysql = require('./demo/demo-mysql');

var _demoMysql2 = _interopRequireDefault(_demoMysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import personDemo from './demo/demo-person'

// import car from './demo/demo-car'

// 创建router
var router = _express2.default.Router();

/* 安装自定义路由 */


// 引入自定义路由
/**
 * Created by xufengchao on 16/9/20.
 * Router Index
 */

(0, _createRoute2.default)(router, _demoMysql2.default, '/demo-mysql');
// createRoute(router, car, '/car')
// createRoute(router, personDemo, '/demo-person')

exports.default = router;