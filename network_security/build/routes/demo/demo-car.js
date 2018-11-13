'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../commons/utils');

var _index = require('../../model/index');

exports.default = {
  '/': [{
    /**
     * @api {get} /api/demo-person Get Person
     * @apiName GetPerson
     * @apiGroup PersonDemo
     *
     * @apiSuccess {String} data 结果集
     */
    method: 'get',
    callback: [function (req, res) {
      _index.Car.findAll().then(function (data) {
        res.json((0, _utils.resJsonMaker)({ data: data, json: true }));
      }).catch(function (err) {
        res.status(500).json((0, _utils.resJsonMaker)({ msg: err ? err.message : 'Get Person Error', err: true }));
      });
    }]
  }, {
    /**
     * @api {post} /api/demo-person Add Person
     * @apiName AddPerson
     * @apiGroup PersonDemo
     *
     * @apiParam {String} name 姓名
     * @apiParam {String} sex 性别
     * @apiParam {Text} description 描述
     *
     * @apiSuccess {String} data 结果集
     */
    method: 'post',
    callback: [function (req, res) {
      var conf = req.body || {};
      delete conf.id;
      _index.Car.create(conf).then(function (data) {
        res.json((0, _utils.resJsonMaker)({ data: data, json: true }));
      }).catch(function (err) {
        res.status(500).json((0, _utils.resJsonMaker)({ msg: err ? err.message : 'Insert Person Error', err: true }));
      });
    }]
  }, {
    method: 'put',
    callback: [function (req, res) {
      var conf = req.body || {};
      delete conf.id;
      _index.Car.create(conf).then(function (data) {
        res.json((0, _utils.resJsonMaker)({ data: data, json: true }));
      }).catch(function (err) {
        res.status(500).json((0, _utils.resJsonMaker)({ msg: err ? err.message : 'Insert Person Error', err: true }));
      });
    }]
  }, {
    method: 'delete',
    callback: [function (req, res) {
      var conf = req.body || {};
      delete conf.id;
      _index.Car.create(conf).then(function (data) {
        res.json((0, _utils.resJsonMaker)({ data: data, json: true }));
      }).catch(function (err) {
        res.status(500).json((0, _utils.resJsonMaker)({ msg: err ? err.message : 'Insert Person Error', err: true }));
      });
    }]
  }]
};