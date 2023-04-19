
import { Categoria } from './Categoria.model.js'
import { Usuario } from './Usuario.model.js'
import { CarroTemporal } from './Carro.model.js'
import { Producto } from './Productos.model.js'
import { Ventas } from './Ventas.model.js'

// relación uno a muchos entre dos modelos: Categoria y Producto
Categoria.hasMany(Producto, { foreignKey: 'id_categoria' })
Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' })


// Relación entre Producto y CarroTemporal
Producto.hasMany(CarroTemporal, { foreignKey: 'id_producto' })
CarroTemporal.belongsTo(Producto, { foreignKey: 'id_producto' })

Usuario.hasMany(Producto, { foreignKey: 'id_usuario' })
Producto.belongsTo(Usuario, { foreignKey: 'id_usuario' })



