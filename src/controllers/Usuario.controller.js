import { Usuario } from '../models/Usuario.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' })
  }
}

export const getUsuariosView = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.render('usuarios', { usuarios })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' })
  }
}

export const countUsuarios = async (req, res) => {
  try {
    const count = await Usuario.count()
    res.status(200).json({ count })
  } catch (error) {
    res.status(500).json({ message: 'Error counting users' })
  }
}


export const createUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    // Cifra la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Crea el usuario con la contraseña cifrada
    const usuario = await Usuario.create({ nombre, email, password: hashedPassword })

    res.status(201).json(usuario)
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' })
  }
}


export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    await Usuario.update({ nombre, email, password }, { where: { id } })
    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' })
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params
    await Usuario.destroy({ where: { id } })
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' })
  }
}


// login usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ id: user.id }, process.env.MYSECRET, { expiresIn: '1h' })

    // Emitir una cookie con el token
    res.cookie('jwt', token, { httpOnly: true, secure: true })

    // Envía la respuesta con el token
    res.json({ token })

  } catch (error) {
    res.status(500).json({ message: 'Error logging in' })
  }
}




