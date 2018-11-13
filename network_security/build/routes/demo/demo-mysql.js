'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../commons/utils');

var _TransitNetwork = require('../../model/demo/TransitNetwork');

var _TransitNetwork2 = _interopRequireDefault(_TransitNetwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Restful, ApiDoc Demo
 * xufengchao
 * 2016.09.20
 */
exports.default = {
  '/:pkValue?': [{
    method: 'post',
    callback: function callback(req, res) {
      console.log('insert', req.body);
      _TransitNetwork2.default.create(req.body).then(function (data) {
        res.json((0, _utils.resJsonMaker)({ data: data }));
      }).catch(function (err) {
        res.json((0, _utils.resJsonMaker)({ data: err, msg: err.message || err.desc, err: true }));
      });
    }
  }, {
    // 查询
    method: 'get',
    callback: function callback(req, res) {
      var where = req.query || {};
      if (where.limit !== undefined) {
        where.limit = +where.limit;
      }
      where.attributes = {
        //sequelize方法会自动添加这两个字段。但我们的数据表中没有这两个属性～因此，需要在查询时显性说明，忽略这两个字段，否则会出错
        exclude: ['createdAt', 'updatedAt']
      };
      console.log('where~~~~', where);
      _TransitNetwork2.default.findAll(where).then(function (data) {
        res.json((0, _utils.resJsonMaker)({ data: data, json: true }));
      });
    }
  }, {
    method: 'delete',
    callback: function callback(req, res) {
      var where = req.query || {};
      // 注意加判断，where为空就删除所有了！
      if (Object.keys(where).length) {
        _TransitNetwork2.default.destroy({ where: where }).then(function (data) {
          res.json((0, _utils.resJsonMaker)({ data: '删除成功', json: true }));
        }).catch(function (err) {
          res.json((0, _utils.resJsonMaker)({ data: err, msg: err.message || err.desc, err: true }));
        });
      }
    }
  }, {
    method: 'put',
    callback: function callback(req, res) {
      var where = req.body || {};
      var condition = { id: where.id };
      console.log('condition', condition);
      _TransitNetwork2.default.update(where, { where: condition }).then(function (data) {
        console.log('更新成功');
        res.json((0, _utils.resJsonMaker)({ data: data, json: true }));
      }).catch(function (err) {
        res.json((0, _utils.resJsonMaker)({ data: err, msg: err.message || err.desc, err: true }));
      });
    }
  }]
};