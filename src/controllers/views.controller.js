import { Producto } from '../models/Productos.model.js'
import { Categoria } from '../models/Categoria.model.js'
import { CarroTemporal } from '../models/Carro.model.js'
import { Ventas } from '../models/Ventas.model.js'


// renderiza productos en /
export const renderProductInventory = async (req, res) => {
    try {
      const products = await Producto.findAll({ raw: true })
      res.render('productInventory', { products })
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al cargar el inventario de productos')
    }
}

export const renderCarro = async (req, res) => {
  try {
    const products = await Producto.findAll({ raw: true })
    const carro = await CarroTemporal.findAll({ raw: true })

    const productsWithQuantityAndTotal = products.map(product => {
      const carroItem = carro.find(item => item.id_producto === product.id_producto)

      if (carroItem) {
        const cantidad = carroItem.cantidad
        const total = product.precio * cantidad
        return { ...product, cantidad, total }
      }
    }).filter(item => item);

    res.render('carro', { products: productsWithQuantityAndTotal })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al cargar el carro de compras')
  }
}

export const renderVentas = async (req, res) => {
  try {
    const ventas = await Ventas.findAll()
    res.render('ventas', { ventas })
  } catch (error) {
    console.error('Error al obtener las ventas:', error)
    res.status(500).send('Error al obtener las ventas')
  }
}

// CRUD mantenedor de productos:
export const renderMantenedor = async (req, res) => {
    try {
      const productos = await Producto.findAll({ raw: true })
      const categoria = await Categoria.findAll({ raw: true })
      res.render('mantenedor', { productos, categoria })
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al cargar el mantenedor de productos')
    }
}

export const agregarProducto = async (req, res) => {
  try {
    const { nombre_producto, precio, stock, imagen, categoria, descripcion } = req.body
    const producto = await Producto.create({
      nombre_producto,
      precio,
      stock,
      imagen,
      categoria,
      descripcion
    })
    res.status(201).json({ code: 201, message: "Producto ingresado con éxito." })
  } catch (error) {
    console.error(error)
    res.status(500).json({ code: 500, message: "Error al guardar el producto." })
  }
}

  export const eliminarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      await Producto.destroy({ where: { id_producto: id } });
      res.redirect('/mantenedor')
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al eliminar el producto')
    }
}


export const eliminarCategoriaporNombre = async (req, res) => {
  try {
    const { nombre_categoria } = req.params

    // Encuentra la categoría usando el nombre_categoria
    const categoria = await Categoria.findOne({
      where: { nombre_categoria: nombre_categoria },
    })

    if (!categoria) {
      res.status(404).send('Categoría no encontrada')
      return
    }

    // Elimina los productos relacionados con la categoría
    await Producto.destroy({ where: { id_categoria: categoria.id_categoria } })

    // Elimina la categoría
    await Categoria.destroy({ where: { id_categoria: categoria.id_categoria } })

    res.redirect('/mantenedor')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al eliminar la categoría')
  }
}


// put
// Controlador para renderizar la plantilla de actualización de producto
export const renderProductoActualizador = async (req, res) => {
  try {
    const id_producto = req.params.id
    const producto = await Producto.findByPk(id_producto)
    const categorias = await Categoria.findAll({ raw: true })

    res.render("actualizadorProductos",{
      id_producto: producto.id,
      categoria: categorias,
    })
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el formulario de actualización de producto.")
  }
}


export const renderCategoriaActualizador = async (req, res) => {
  try {
    const nombre_categoria = req.params.nombre_categoria
    const categoria = await Categoria.findOne({ where: { nombre_categoria: nombre_categoria } })

    if (!categoria) {
      res.status(404).send('Categoría no encontrada')
      return
    }

    const categorias = await Categoria.findAll({ raw: true })

    res.render("actualizadorCategorias", {
      id_categoria: categoria.id_categoria,
      categoria: categorias,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error al cargar el formulario de actualización de categoria.");
  }
}

// renderizado página register
export const renderRegisterPage = (req, res) => {
  res.render('register', {
    title: 'Registro',
  })
}

// controlador de inicio de sesión
export const renderLoginPage = (req, res) => {
  res.render('login', {
    title: 'Login',
  })
}


// Añade este controlador a tus controladores de vista
export const renderVerMas = async (req, res) => {
  try {
    const id_producto = req.params.id
    const producto = await Producto.findByPk(id_producto);

    res.render('vermas', { producto })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al cargar los detalles del producto')
  }
}

