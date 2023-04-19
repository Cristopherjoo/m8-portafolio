import app from "./app.js"
import {sequelize} from "./db/db.js"
import dotenv from 'dotenv'
dotenv.config()
import './models/Productos.model.js'
import './models/Categoria.model.js'
import './models/Carro.model.js'
import './models/Ventas.model.js'

// relaciones
import './models/relaciones.js'


const main = async () =>{
    try {
        await sequelize.authenticate()
        console.log('Conectado con éxito.')
        await sequelize.sync({force:false, alter:false, create:false})
     
        let PORT = process.env.PORT || 3000
        app.listen(PORT , ()=>console.log('Servidor ejecutándose en http://localhost:' + PORT))
    } catch (error) {
        console.log(error)
        console.log('Ha ocurrido un error.')
    }
}

main()