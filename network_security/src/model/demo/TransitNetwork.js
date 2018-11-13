import Sequelize from 'sequelize'
import DB from '../../database/seq'

// 数据表的基本定义。创建的数据表，表名是transitnet0515s

let Model = DB &&
  DB.define('transitnet0515',
    {
      event_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      },
      event_name: Sequelize.TEXT,
      start_time: {
        type: Sequelize.STRING,
        allowNull: true
      },
      end_time: {
        type: Sequelize.STRING,
        allowNull: true
      },
      send_node_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      send_node_global_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      receive_node_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      receive_node_global_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      val: {
        type: Sequelize.DOUBLE,
        allowNull: true
      }
    }
  )

export default Model
