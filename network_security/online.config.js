/**
 * Created by huangxinxin on 16/11/14.
 */
module.exports = {
  host: '127.0.0.1',
  port: 3002,
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
