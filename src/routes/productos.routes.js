import express from 'express'
import { 
  getProducts, 
  getProductsById, 
  addProductInventory, 
  deleteProductById, 
  updateProductById,
  createCategory, 
  getCategories,
  getCategoryByName, 
  deleteCategoryById,
  updateCategoryById,
  getCategoryNameById,
} from '../controllers/productos.controller.js'

const router = express.Router()

// Rutas de productos
router.get('/api/v1/productos', getProducts)
router.get('/api/v1/productos/:id_producto', getProductsById)
router.post('/api/v1/productos', addProductInventory)
router.delete('/api/v1/productos/:id_producto', deleteProductById)
router.put('/api/v1/productos/:id_producto', updateProductById)

// Rutas de categorías
router.post('/api/v1/categorias', createCategory)
router.get('/api/v1/categorias', getCategories)
router.get('/api/v1/categorias/:nombre_de_la_categoria', getCategoryByName)
router.delete('/api/v1/categorias/:id_categoria', deleteCategoryById)
router.put('/api/v1/categorias/:id_categoria', updateCategoryById)
router.get('/api/v1/categorias/:id_categoria', getCategoryNameById)




export default router;
