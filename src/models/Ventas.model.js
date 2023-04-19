import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'

export const Ventas = sequelize.define('Ventas', {
  id_ventas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  precio_total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Ventas',
  alias : 'Ventas'
})

