import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'

export const Categoria  = sequelize.define('Categoria',{
  id_categoria :{
      type : DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      validate: {
          notEmpty: true
      }
  },
  nombre_categoria :{
      type : DataTypes.STRING(200),
      allowNull: false,
      validate: {
          notEmpty: true
      }
  }
},{
  timestamps: true,
  tableName : 'Categoria',
  alias : 'Categoria'
})