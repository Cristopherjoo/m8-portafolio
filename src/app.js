import express, { json, urlencoded } from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { create } from 'express-handlebars'
import cors from 'cors'
import moment from 'moment'
import cookieParser from 'cookie-parser'
import apiProductos from './routes/productos.routes.js'
import vistasRoutes from './routes/vistas.routes.js'
import carro from './routes/carro.routes.js'
import apiUsuario from './routes/usuario.routes.js'
import ventasRoutes from './routes/ventas.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

// Inicio de rutas
app.use(apiProductos)
app.use(vistasRoutes)
app.use(carro)
app.use(apiUsuario)
app.use(ventasRoutes)
app.use(authRoutes)

// Asignamos la unión de los archivos views
app.set("views", join(__dirname, "views/"))

// Configuración handlebars
const hbs = create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"), 
  extname: ".handlebars", 
  helpers: {
    formatDate: function (date) {
      return moment(date).format('DD/MM/YYYY')
    },
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
})

app.engine(".handlebars", hbs.engine)
app.set("view engine", ".handlebars")

export default app

