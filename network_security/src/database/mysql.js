/**
 * Created by xufengchao on 16/9/11.
 * Mysql Config
 */

import mysql from 'mysql'
import config from '../config'

let opts = config.db.mysql

console.log('test', opts)

let ins = null

try {
  if (opts) {
    ins = mysql.createPool(opts)
  }
} catch (err) {
  throw err
}

export default ins
