/**
 * Created by xufengchao on 16/9/11.
 * Models
 */

import config from '../config'
import {logs} from '../commons/utils'
import DB from '../database/seq'
import Session from './Session'

// demo
import Person from './demo/Person'
import Car from './demo/Car'
import TransitNetwork from './demo/TransitNetwork'
let _logs = logs('Model')

// 初始化模型之间的关系
const initRelations = () => {
  return new Promise((resolve, reject) => {
    try {
      // todo relations
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

// 初始化所有模型
const initSync = () => {
  let syncForce = config.db.sequelize && config.db.sequelize.syncForce
  _logs('Force:' + syncForce)
  return DB.sync({ force: syncForce })
}

DB && DB.authenticate()
  .then(initRelations)
  .then(initSync)
  .catch((error) => {
    _logs('Model建立失败', error)
    throw new Error('Model建立失败')
  })

export {Session, Person, Car, TransitNetwork}
