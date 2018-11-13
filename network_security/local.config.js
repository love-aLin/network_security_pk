/**
 * Created by huangxinxin on 16/11/14.
 */
module.exports = {
  client: {
    // devServer
    // proxy: Array or Function
    // 当为函数时接受两个形参[server, proxyMiddleware],
    // 当为数组时 `path`的设置参考http://expressjs.com/en/4x/api.html#app.use, `config`的设置参考https://www.npmjs.com/package/http-proxy-middleware
    devServer: {
      host: '127.0.0.1',
      port: 3002,
      proxy: [ {
        path: /\/api/,
        config: {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          logLevel: 'debug',
          ws: true
        }
      } ]
    }
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    portForApiDocPage: 3001,
    // 存储
    db: {
      mysql: null,
      mysql: {
        host: '192.168.10.9',
        user: 'transitnet',
        password: 'pkuvistransit',
        database: 'transit_network',
        connectionLimit: 10,      // 连接池上限
        multipleStatements: true  // 多语句组合
      },
      // sequelize: null
      sequelize: {
        dialect: 'mysql',         // 数据库类型
        host: '192.168.10.9',
        port: '3306',
        user: 'transitnet',
        password: 'pkuvistransit',
        database: 'transit_network',
        syncForce: false
      },
      syncForce: false  //syncForce设置为true，会导致每次重启服务时，将已有的数据表删除，重新建数据表
    }
  }
}
