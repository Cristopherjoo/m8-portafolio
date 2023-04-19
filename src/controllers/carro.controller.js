import { CarroTemporal } from '../models/Carro.model.js'

// Crear un nuevo elemento en CarroTemporal
export const createCarroTemporal = async (req, res) => {
  try {
    const { cantidad, id_producto } = req.body

    const carroTemporal = await CarroTemporal.create({
      cantidad,
      id_producto
    })

    res.status(201).json(carroTemporal);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el elemento en el carrito temporal', error })
  }
}


// Obtener todos los elementos en CarroTemporal
export const getAllCarroTemporal = async (req, res) => {
  try {
    const carroTemporal = await CarroTemporal.findAll()

    res.status(200).json(carroTemporal)
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los elementos del carrito temporal', error })
  }
}


// Obtener un elemento en CarroTemporal por ID
export const getCarroTemporalById = async (req, res) => {
  try {
    const { id } = req.params
    const carroTemporal = await CarroTemporal.findByPk(id)

    if (!carroTemporal) {
      res.status(404).json({ message: 'No se encontró el elemento en el carrito temporal con el ID proporcionado' })
      return
    }

    res.status(200).json(carroTemporal)
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el elemento en el carrito temporal', error })
  }
}

// Actualizar un elemento en CarroTemporal por ID
export const updateCarroTemporal = async (req, res) => {
  try {
    const { id_producto } = req.params
    const { cantidad } = req.body
    const carroTemporal = await CarroTemporal.findByPk(id_producto)

    if (!carroTemporal) {
      res.status(404).json({ message: 'No se encontró el elemento en el carrito temporal con el ID proporcionado' })
      return
    }

    await carroTemporal.update({ cantidad })
    res.status(200).json(carroTemporal)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el elemento en el carrito temporal', error })
  }
}

// Eliminar un elemento en CarroTemporal por ID
export const deleteCarroTemporal = async (req, res) => {
        try {
          const { id_producto } = req.params
      
          const carroTemporal = await CarroTemporal.findByPk(id_producto)
      
          if (!carroTemporal) {
            res.status(404).json({ message: 'No se encontró el elemento en el carrito temporal con el ID proporcionado' })
            return
          }
      
          await carroTemporal.destroy()
      
          res.status(200).json({ message: 'Elemento en el carrito temporal eliminado exitosamente' })
        } catch (error) {
          res.status(400).json({ message: 'Error al eliminar el elemento en el carrito temporal', error })
        }
}


// Incrementar la cantidad de un producto en el carrito temporal
export const addOneToCarroTemporal = async (req, res) => {
  try {
    const { id_producto } = req.params
    console.log(`id_producto: ${id_producto}`)

    // Buscar si ya existe un registro para el producto en CarroTemporal
    const carroTemporal = await CarroTemporal.findOne({
      where: { id_producto },
    })

    if (carroTemporal) {
      // Si ya existe, incrementar la cantidad en 1
      const newCantidad = carroTemporal.cantidad + 1;
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
    console.error(error)   
    res.status(400).json({ message: 'Error al incrementar la cantidad del producto en el carrito temporal', error })
  }
}

// Eliminar un elemento en CarroTemporal por ID (completamente)
export const deleteCarroTemporalCompletely = async (req, res) => {
  try {
    const { id_producto } = req.params;

    const carroTemporal = await CarroTemporal.findByPk(id_producto)

    if (!carroTemporal) {
      res.status(404).json({ message: 'No se encontró el elemento en el carrito temporal con el ID proporcionado' })
      return
    }

    await carroTemporal.destroy()

    res.status(200).json({ message: 'Elemento en el carrito temporal eliminado completamente' })
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el elemento en el carrito temporal completamente', error })
  }
}


// Eliminar todos los elementos en CarroTemporal
export const deleteAllCarroTemporal = async (req, res) => {
  try {
    await CarroTemporal.destroy({ where: {} })

    res.status(200).json({ message: 'Todos los elementos en el carrito temporal han sido eliminados' })
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar todos los elementos en el carrito temporal', error })
  }
}
