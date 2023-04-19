import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'

export const CarroTemporal = sequelize.define(
  'CarroTemporal',
  {
    id_carro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    tableName: 'CarroTemporal',
    alias: 'CarroTemporal',
  }
)