'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../commons/utils');

var _logs = (0, _utils.logs)('Routers'); /**
                                          * Created by xufengchao on 16/9/20.
                                          */

exports.default = function (router, conf, namespace) {
  if (namespace.charAt(0) !== '/') {
    namespace = '/' + namespace;
  }

  var _loop = function _loop(_uri) {
    var actions = conf[_uri];
    if (_uri.charAt(0) !== '/') {
      _uri = '/' + _uri;
    }
    var path = [namespace, _uri].join('');
    actions.forEach(function (item) {
      var method = item.method;
      var callback = item.callback;
      if (callback instanceof Array) {
        callback.forEach(function (cb) {
          if (cb instanceof Function) {
            router.route(path)[method](cb);
          }
        });
      } else {
        router.route(path)[method](callback);
      }
      _logs('Path:' + path + ' Method:' + method);
    });
    uri = _uri;
  };

  for (var uri in conf) {
    _loop(uri);
  }
};