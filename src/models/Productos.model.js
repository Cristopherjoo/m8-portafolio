import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'

export const Producto = sequelize.define(
    'Producto',
    {
      id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      nombre_producto: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      imagen: {
        type: DataTypes.STRING(10000),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      descripcion: {
        type: DataTypes.STRING(10000),
      },
      categoria: {
        type: DataTypes.STRING(500),
      },
    },
    {
      timestamps: true,
      tableName: 'Producto',
      alias : 'Producto'
    }
)