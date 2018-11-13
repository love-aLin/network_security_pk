/**
 * Created by huangxinxin on 16/9/18.
 */
import session from 'express-session'
import connectSessionSequelize from 'connect-session-sequelize'
import {logs, resJsonMaker} from '../commons/utils'
import DB from '../database/seq'
import config from '../config'

let _logs = logs('SESSION')

let opts = config.session

let isOff = opts.status === 'off'

export default {
  init: () => {
    let Store = connectSessionSequelize(session.Store)
    return isOff ? (req, res, next) => { next() } : session({
      resave: false,
      saveUninitialized: true,
      secret: opts.secret,
      store: new Store({
        db: DB,
        table: opts.table,
        expiration: opts.expiration,
        checkExpirationInterval: opts.checkExpirationInterval,
        extendDefaultFields (defaults, session) {
          return Object.assign(defaults, session)
        }
      })
    })
  },
  save: (req, res, next) => {
    if (isOff) {
      next()
    } else {
      req.session.save((err) => {
        if (err) {
          let msg = '会话保存失败'
          _logs(msg, err)
          if (req.xhr) {
            res.status(500).json(resJsonMaker({ msg, err: true }))
          } else {
            res.render('sys.error.ejs', { title: config.app.title, message: msg })
          }
        } else {
          _logs('会话保存成功')
          next()
        }
      })
    }
  },
  check: (req, res, next) => {
    if (isOff) {
      next()
    } else {
      // 进行会话检查, 然后决定下一步做什么, 比如: 失败可以跳转登录, 成功则next()
      next()
    }
  }
}
