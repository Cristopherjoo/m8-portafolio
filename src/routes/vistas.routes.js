import express from 'express'
import jwt from 'jsonwebtoken'

import { renderProductInventory, renderMantenedor, agregarProducto, eliminarProducto, 
    eliminarCategoriaporNombre, renderProductoActualizador, renderCategoriaActualizador, renderRegisterPage,
renderLoginPage, renderCarro, renderVentas, renderVerMas } from '../controllers/views.controller.js'
import { checkAuthentication } from '../controllers/auth.controller.js'


const router = express.Router()

// Ruta para renderizar el inventario de posts
router.get('/', renderProductInventory,checkAuthentication)

// Ruta para renderizar el inventario de posts
router.get('/carro', renderCarro,checkAuthentication)

// Ruta para el mantenedor
router.get('/mantenedor', renderMantenedor,checkAuthentication)
// Ruta para agregar un nuevo post
router.post('/añadir', agregarProducto,checkAuthentication)

router.get('/eliminar/:id',checkAuthentication, eliminarProducto)
router.get('/eliminar_categoria/:nombre_categoria', checkAuthentication, eliminarCategoriaporNombre)

// Rutas para actualizar
router.get("/actualizar/:id",checkAuthentication ,renderProductoActualizador)
router.get('/actualizar_categoria/:nombre_categoria', checkAuthentication, renderCategoriaActualizador)

// ruta para renderizar register
router.get('/register', renderRegisterPage)

// ruta para renderizar la página de inicio de sesión
router.get('/login', renderLoginPage)

router.get('/ventas', renderVentas)

router.get('/vermas/:id', renderVerMas)

export default router

