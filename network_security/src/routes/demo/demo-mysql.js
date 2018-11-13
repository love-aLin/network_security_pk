/**
 * Restful, ApiDoc Demo
 * xufengchao
 * 2016.09.20
 */
import { resJsonMaker } from '../../commons/utils'
import TransitNetwork from '../../model/demo/TransitNetwork'

export default {
  '/:pkValue?': [{
    method: 'post',
    callback: (req, res) => {
      console.log('insert', req.body)
      TransitNetwork.create(req.body)
      .then((data) => {
        res.json(resJsonMaker({data: data}))
      })
      .catch((err) => {
        res.json(resJsonMaker({data: err, msg: err.message || err.desc, err: true}))
      })
    }
  }, {
    // 查询
    method: 'get',
    callback: (req, res) => {
      let where = req.query || {}
      if (where.limit !== undefined) {
        where.limit = (+where.limit)
      }
      where.attributes = {
        //sequelize方法会自动添加这两个字段。但我们的数据表中没有这两个属性～因此，需要在查询时显性说明，忽略这两个字段，否则会出错
        exclude: [
          'createdAt', 
          'updatedAt'
        ]
      }
      console.log('where~~~~', where)
      TransitNetwork
      .findAll(where)
      .then((data) => {
        res.json(resJsonMaker({data: data, json: true}))
      })
    }
  }, {
    method: 'delete',
    callback: (req, res) => {
      let where = req.query || {}
      // 注意加判断，where为空就删除所有了！
      if (Object.keys(where).length) {
        TransitNetwork.destroy({where})
        .then((data) => {
          res.json(resJsonMaker({data: '删除成功', json: true}))
        }).catch((err) => {
          res.json(resJsonMaker({data: err, msg: err.message || err.desc, err: true}))
        })
      }
    }
  }, {
    method: 'put',
    callback: (req, res) => {
      let where = req.body || {}
      let condition = {id: where.id}
      console.log('condition', condition)
      TransitNetwork.update(where, {where: condition})
      .then((data) => {
        console.log('更新成功')
        res.json(resJsonMaker({data: data, json: true}))
      })
      .catch((err) => {
        res.json(resJsonMaker({data: err, msg: err.message || err.desc, err: true}))
      })
    }
  }]
}
