import express from 'express'
import {
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUser,
  getUsuariosView,
  countUsuarios,
} from '../controllers/Usuario.controller.js'

const router = express.Router()

// GET /api/v1/usuarios/count
router.get('/api/v1/usuarios/count', countUsuarios)


// GET /usuarios
router.get('/usuarios', getUsuariosView)


// GET /api/v1/usuarios
router.get('/api/v1/usuarios', getAllUsuarios)

// POST /api/v1/usuarios
router.post('/api/v1/usuarios', createUsuario)

// ruta login usuario
router.post('/api/v1/login', loginUser)


// PUT /api/v1/usuarios/:id
router.put('/api/v1/usuarios/:id', updateUsuario)

// DELETE /api/v1/usuarios/:id
router.delete('/api/v1/usuarios/:id', deleteUsuario)

export default router
