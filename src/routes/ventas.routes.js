import express from 'express'
import { getAllVentas, createVenta, updateVenta, deleteVenta } from '../controllers/ventas.controller.js'

const router = express.Router()

router.get('/ventas', getAllVentas)
router.post('/ventas', createVenta)
router.put('/ventas/:id', updateVenta)
router.delete('/ventas/:id', deleteVenta)

export default router
