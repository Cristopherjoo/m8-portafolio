import { Usuario } from '../models/Usuario.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
    try {
      const { nombre, email, password } = req.body
  
      // Busca si el correo electrónico ya está registrado en la base de datos
      const existingUser = await Usuario.findOne({ where: { email } })
  
      if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado' })
      }
  
      // Cifrar la contraseña antes de almacenarla en la base de datos

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
  
          // Crea el nuevo usuario
      const newUser = await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
      });

  // Envía una respuesta al cliente indicando que el registro fue exitoso
      res.status(201).json({ message: 'Registro completado', user: newUser })
    } catch (error) {
      res.status(500).json({ message: 'Error en el registro', error })
    }
};

// Middleware para verificar si el usuario está autenticado en función del token guardado en las cookies
export const checkAuthentication = (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    return res.redirect('/login')
  }

// Verifica si el token es válido utilizando la clave secreta especificada
  try {
    jwt.verify(token, process.env.MYSECRET)
    next()
  } catch (err) {
    return res.redirect('/login')
  }
}

export const logout = (req, res) => {
  res.clearCookie('jwt')
  res.redirect('/')
}
