// controllers/ventas.controller.js
import { Ventas } from '../models/Ventas.model.js'

export async function getAllVentas(req, res) {
  try {
    const ventas = await Ventas.findAll()
    const totalVentas = ventas.reduce((total, venta) => total + venta.precio_total, 0)
    res.render('ventas', { ventas, totalVentas });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ventas', error })
  }
}

export async function createVenta(req, res) {
  try {
    const { id_producto, cantidad, precio_unitario, precio_total } = req.body
    const nuevaVenta = await Ventas.create({ id_producto, cantidad, precio_unitario, precio_total })
    res.status(201).json(nuevaVenta)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la venta', error })
  }
}

export async function updateVenta(req, res) {
  try {
    const id_ventas = req.params.id
    const { id_producto, cantidad, precio_unitario, precio_total } = req.body

    await Ventas.update({ id_producto, cantidad, precio_unitario, precio_total }, { where: { id_ventas } });
    res.status(200).json({ message: 'Venta actualizada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la venta', error })
  }
}

export async function deleteVenta(req, res) {
  try {
    const id_ventas = req.params.id

    await Ventas.destroy({ where: { id_ventas } });
    res.status(200).json({ message: 'Venta eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la venta', error })
  }
}
