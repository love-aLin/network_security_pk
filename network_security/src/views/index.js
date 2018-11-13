/**
 * Created by xufengchao on 16/9/20.
 * 配置页面路由
 */

import express from 'express'
import app from '../app'
import session from '../commons/session'
import config from '../config'

let router = express.Router()

// api page in dev env
if (!config.pro) {
  router.get('/apidoc/', (req, res) => res.render('sys.apidoc.ejs', { url: config.secheme + '://' + req.host + ':' + app.get('apiPort') + '/' }))
}

// index page by ejs render
router.get([ '/index' ], (req, res) => res.render('sys.index.ejs'))

// client page need session.check
router.get([ '/', /\/page/ ], session.check, (req, res, next) => res.render('index.html'))

export default router
