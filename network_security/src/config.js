import path from 'path'
import errorCode from './errorCode'
let localConfig = require('../local.config').server
let onlineConfig = require('../online.config');
let isPro = process.env.NODE_ENV === 'production'
let runningConfig = isPro ? onlineConfig : localConfig

export default Object.assign({
  errorCode,
  pro: isPro,
  path: {
    base: __dirname,
    logs: '../logs',
    public: '../public',
    views: '../public',
    favicon: '../public/favicon.png',
    get logsAbs () {
      return path.resolve(this.base, this.logs)
    },
    get publicAbs () {
      return path.resolve(this.base, this.public)
    },
    get viewsAbs () {
      return path.resolve(this.base, this.views)
    },
    get faviconAbs () {
      return path.resolve(this.base, this.favicon)
    }
  },
  secheme: 'http', // 服务类型
  limit: '50mb', // 请求字节限制
  // session
  session: {
    table: 'Session',
    status: 'off', // 开启 on, 关闭 off
    secret: '~Yoursecret~',
    checkExpirationInterval: 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 3 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
  },
  time: {
    formatStr: 'YYYY-MM-DD HH:mm:ss'
  },
  app: {
    title: 'Your App Title'
  }
}, runningConfig)
