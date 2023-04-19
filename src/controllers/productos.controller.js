import { Producto } from '../models/Productos.model.js'
import { Categoria } from '../models/Categoria.model.js'


export const getProducts = async (req, res) => {
  Producto.findAll().then(productos => {
    res.json({ code: 200, data: productos })
  }).catch(error => {
    res.json({ code: 500, message: "Error al cargar los datos" })
  })
}


export const getProductsById = async (req, res) => {
  try {
    let { id_producto } = req.params
    let producto = await Producto.findByPk(id_producto);
    res.status(200).json({code : 200 , data : producto})
  } catch (error) {
    res.status(500).json({code: 500 , message : "Error al cargar los productos"})
  }
}

//add un producto a la bd
export const addProductInventory = async (req, res) => {
    try {
      let { nombre, precio, stock, imagen, descripcion, categoria } = req.body
      
      let producto = await Producto.create({ 
        nombre_producto : nombre, 
        precio : precio, 
        stock : stock, 
        imagen : imagen, 
        descripcion : descripcion,
        categoria: categoria
      });

      res.status(201).json({ code: 201, message: "Producto ingresado con éxito." })
    } catch (error) {
      res.status(500).json({ code: 500, message: "Error al guardar el producto." })
    }
}

export const createCategory = async (req, res) => {
  try {
      const { nombre_categoria } = req.body
      if (!nombre_categoria) {
        throw new Error("El nombre de la categoría es requerido.")
      }
      const categoria = await Categoria.create({
          nombre_categoria
      })
      res.status(201).send({
          success: true,
          message: 'Categoría creada con éxito',
          data: categoria
      })
  } catch (error) {
      res.status(400).send({
          success: false,
          message: error.message
      })
  }
}


export const getCategories = async (req, res) => {
    try {
      const categories = await Categoria.findAll()
      res.status(200).json({ code: 200, data: categories })
    } catch (error) {
      console.error(error)
      res.status(500).json({ code: 500, message: "Error al cargar las categorías" })
    }
}

export const getCategoryByName = async (req, res) => {
  try {
    const categoryName = decodeURIComponent(req.params.nombre_de_la_categoria)

    const category = await Categoria.findOne({ where: { nombre_categoria: categoryName } })

    if (!category) {
      return res.status(404).json({ message: `No se encontró la categoría con el nombre ${categoryName}` })
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener la categoría' })
  }
}

export const getCategoryNameById = async (req, res) => {
  try {
    const { id_categoria } = req.params
    const categoria = await Categoria.findByPk(id_categoria);
    if (!categoria) {
      res.status(404).json({ message: `No se encontró la categoría con id ${id_categoria}` })
    } else {
      const nombre_categoria = categoria.nombre_categoria;
      res.status(200).json({ nombre_categoria })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener el nombre de la categoría' })
  }
}


// Eliminar un producto por id_producto
export const deleteProductById = async (req, res) => {
  try {
    const { id_producto } = req.params
    const result = await Producto.destroy({ where: { id_producto } })

    if (result) {
      res.status(200).json({ code: 200, message: "Producto eliminado con éxito." })
    } else {
      res.status(404).json({ code: 404, message: "Producto no encontrado." })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ code: 500, message: "Error al eliminar el producto." })
  }
};

// Eliminar una categoría por id_categoria
export const deleteCategoryById = async (req, res) => {
  try {
    const { id_categoria } = req.params
    const result = await Categoria.destroy({ where: { id_categoria } })

    if (result) {
      res.status(200).json({ code: 200, message: "Categoría eliminada con éxito." })
    } else {
      res.status(404).json({ code: 404, message: "Categoría no encontrada." })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: "Error al eliminar la categoría." })
  }
}


export const updateProductById = async (req, res) => {
  try {
    const { id_producto } = req.params
    const { nombre_producto, precio, stock, imagen, descripcion, categoria } = req.body

    const result = await Producto.update(
      {
        nombre_producto,
        precio,
        stock,
        imagen,
        descripcion,
        categoria,
      },
      {
        where: { id_producto },
      }
    )

    if (result[0]) {
      res.status(200).json({ code: 200, message: "Producto actualizado con éxito." })
    } else {
      res.status(404).json({ code: 404, message: "Producto no encontrado." })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: "Error al actualizar el producto." })
  }
}

export const updateCategoryById = async (req, res) => {
  try {
    const { id_categoria } = req.params
    const { nombre_categoria } = req.body;

    const result = await Categoria.update(
      {
        nombre_categoria,
      },
      {
        where: { id_categoria },
      }
    )

    if (result[0]) {
      res.status(200).json({ code: 200, message: "Categoría actualizada con éxito." })
    } else {
      res.status(404).json({ code: 404, message: "Categoría no encontrada." })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: "Error al actualizar la categoría." })
  }
}


// Incrementar la cantidad de un producto en el carrito temporal
export const addOneToCarroTemporal = async (req, res) => {
  try {
    const { id_producto } = req.params

    // Buscar si ya existe un registro para el producto en CarroTemporal
    const carroTemporal = await CarroTemporal.findOne({
      where: { id_producto },
    })

    if (carroTemporal) {
      // Si ya existe, incrementar la cantidad en 1
      const newCantidad = carroTemporal.cantidad + 1
      await carroTemporal.update({ cantidad: newCantidad })

      res.status(200).json({ message: 'Cantidad incrementada en 1' })
    } else {
      // Si no existe, crear un nuevo registro con cantidad igual a 1
      await CarroTemporal.create({
        cantidad: 1,
        id_producto,
      })

      res.status(201).json({ message: 'Producto añadido al carrito' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al incrementar la cantidad del producto en el carrito temporal', error });
  }
};
