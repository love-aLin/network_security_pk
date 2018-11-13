'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectSessionSequelize = require('connect-session-sequelize');

var _connectSessionSequelize2 = _interopRequireDefault(_connectSessionSequelize);

var _utils = require('../commons/utils');

var _seq = require('../database/seq');

var _seq2 = _interopRequireDefault(_seq);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _logs = (0, _utils.logs)('SESSION'); /**
                                          * Created by huangxinxin on 16/9/18.
                                          */


var opts = _config2.default.session;

var isOff = opts.status === 'off';

exports.default = {
  init: function init() {
    var Store = (0, _connectSessionSequelize2.default)(_expressSession2.default.Store);
    return isOff ? function (req, res, next) {
      next();
    } : (0, _expressSession2.default)({
      resave: false,
      saveUninitialized: true,
      secret: opts.secret,
      store: new Store({
        db: _seq2.default,
        table: opts.table,
        expiration: opts.expiration,
        checkExpirationInterval: opts.checkExpirationInterval,
        extendDefaultFields: function extendDefaultFields(defaults, session) {
          return Object.assign(defaults, session);
        }
      })
    });
  },
  save: function save(req, res, next) {
    if (isOff) {
      next();
    } else {
      req.session.save(function (err) {
        if (err) {
          var msg = '会话保存失败';
          _logs(msg, err);
          if (req.xhr) {
            res.status(500).json((0, _utils.resJsonMaker)({ msg: msg, err: true }));
          } else {
            res.render('sys.error.ejs', { title: _config2.default.app.title, message: msg });
          }
        } else {
          _logs('会话保存成功');
          next();
        }
      });
    }
  },
  check: function check(req, res, next) {
    if (isOff) {
      next();
    } else {
      // 进行会话检查, 然后决定下一步做什么, 比如: 失败可以跳转登录, 成功则next()
      next();
    }
  }
};