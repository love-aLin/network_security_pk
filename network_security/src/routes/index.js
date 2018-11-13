/**
 * Created by xufengchao on 16/9/20.
 * Router Index
 */

import express from 'express'
import createRoute from '../commons/createRoute'

// 引入自定义路由
import mysqlDemo from './demo/demo-mysql'
// import personDemo from './demo/demo-person'

// import car from './demo/demo-car'

// 创建router
let router = express.Router()

/* 安装自定义路由 */
createRoute(router, mysqlDemo, '/demo-mysql')
// createRoute(router, car, '/car')
// createRoute(router, personDemo, '/demo-person')

export default router
