import express from 'express'
import { register, logout } from '../controllers/auth.controller.js'

const router = express.Router()

// POST /register
router.post('/register', register)

// Ruta de deslogueo
router.get('/logout', logout)



export default router
