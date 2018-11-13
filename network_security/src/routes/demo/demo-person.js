import {resJsonMaker} from '../../commons/utils'
import {Person} from '../../model/index'

const PersonIsOn = (req, res, next) => {
  if (Person) {
    next()
  } else {
    res.status(500).json(resJsonMaker({ msg: 'Model Person Error', err: true }))
  }
}

export default {
  '/': [ {
    /**
     * @api {get} /api/demo-person Get Person
     * @apiName GetPerson
     * @apiGroup PersonDemo
     *
     * @apiSuccess {String} data 结果集
     */
    method: 'get',
    callback: [
      PersonIsOn,
      (req, res) => {
        Person
          .findAll()
          .then((data) => {
            res.json(resJsonMaker({ data, json: true }))
          })
          .catch((err) => {
            res.status(500).json(resJsonMaker({ msg: err ? err.message : 'Get Person Error', err: true }))
          })
      }
    ]
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
    callback: [
      PersonIsOn,
      (req, res) => {
        let conf = req.body || {}
        delete conf.id
        Person
          .create(conf)
          .then((data) => {
            res.json(resJsonMaker({ data, json: true }))
          })
          .catch((err) => {
            res.status(500).json(resJsonMaker({ msg: err ? err.message : 'Insert Person Error', err: true }))
          })
      } ]
  } ]
}
