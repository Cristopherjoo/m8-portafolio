import express from 'express'
import {
  getAllCarroTemporal,
  getCarroTemporalById,
  createCarroTemporal,
  updateCarroTemporal,
  deleteCarroTemporal,
  addOneToCarroTemporal,
  deleteCarroTemporalCompletely,
  deleteAllCarroTemporal,
} from '../controllers/carro.controller.js'

const router = express.Router()

router.get('/carrotemp/', getAllCarroTemporal)
router.get('/carrotemp/:id', getCarroTemporalById)

router.post('/carrotemp/', createCarroTemporal)
router.put('/carrotemp/update/:id_producto', updateCarroTemporal)

router.delete('/carrotemp/delete/:id', deleteCarroTemporal)
router.delete('/carrotemp/deleteCompletely/:id_producto', deleteCarroTemporalCompletely)

router.post('/carrotemp/add/:id_producto', addOneToCarroTemporal)

router.delete('/carrotemp/deleteAll', deleteAllCarroTemporal)

export default router