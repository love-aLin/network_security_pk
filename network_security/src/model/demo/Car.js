import Sequelize from 'sequelize'
import DB from '../../database/seq'

let Model = DB &&
  DB.define('car',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      name: Sequelize.STRING,
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }
  )

export default Model
