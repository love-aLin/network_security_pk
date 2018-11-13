import http from 'http'
import express from 'express'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import ejs from 'ejs'
import accessLog from './access'
import config from './config'
import {logs, resJsonMaker, getCompleteUrl} from './commons/utils'
import session from './commons/session'
import routersProcess from './routes/index'
import viewsProcess from './views/index'
import './model/index'

let _logs = logs('APP')
let app = express()
let errorCode = config.errorCode
let server = http.createServer(app)
let sessionMiddleware = session.init()

// 启用访问日志
accessLog(app)

// set port
app.set('port', config.port)
app.set('apiPort', +config.portForApiDocPage)

// view engine setup
app.set('views', config.path.viewsAbs)
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

// static
app.use(express.static(config.path.publicAbs, { index: false }))

console.log("~~~~~", config.path.publicAbs);

// favicon
app.use(favicon(config.path.faviconAbs))

// bodyParser
app.use(bodyParser.json({
  limit: config.limit
}))
app.use(bodyParser.urlencoded({
  extended: false,
  limit: config.limit
}))

// cookieParser
app.use(cookieParser())

// session
app.use(sessionMiddleware)

// view routers
app.use(viewsProcess)

// routers
app.use(/^\/api/, routersProcess)

// Error handler
app.use((req, res) => {
  _logs('404:' + getCompleteUrl(req))
  let err = errorCode[ '404' ]
  if (req.xhr) {
    res.status(404).json(resJsonMaker({ data: err.code, msg: err.desc, err: true }))
  } else {
    res.status(404).render('sys.error.ejs', { title: config.app.title, message: err.desc })
  }
})

export {app, server}
