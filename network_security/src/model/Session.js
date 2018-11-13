/**
 * Created by huangxinxin on 16/9/18.
 */
import Sequelize from 'sequelize'
import DB from '../database/seq'
import config from '../config'

let Model = null

try {
  if (config.session.status === 'on') {
    if (DB) {
      Model = DB.define(
        config.session.table, {
          sid: {
            type: Sequelize.STRING,
            primaryKey: true
          },
          expires: Sequelize.DATE,
          data: Sequelize.TEXT
        }, {
          tableName: config.session.table,
          timestamps: true
        }
      )
    } else {
      throw new Error('启用Session失败，未找到DB实例')
    }
  }
} catch (err) {
  throw err
}

export default Model
