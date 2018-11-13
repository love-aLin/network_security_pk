/**
 * Created by xufengchao on 16/9/11.
 * Sequelize Config
 */

import Sequelize from 'sequelize'
import config from '../config'

let opts = config.db.sequelize

let ins = null

try {
  if (opts) {
    ins = new Sequelize(opts.database, opts.user, opts.password, opts)
  }
} catch (err) {
  throw err
}

export default ins
