const db = require('../db/db');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, email, rol FROM usuarios ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error al obtener usuarios.');
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ msg: 'Por favor, ingrese todos los campos requeridos.' });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
      [nombre, email, password_hash, rol || 'admin']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Código de error para duplicados de PostgreSQL
      return res.status(409).json({ msg: 'El correo electrónico ya está en uso.' });
    }
    res.status(500).send('Error al crear el usuario.');
  }
};

// Actualizar un usuario existente
exports.updateUser = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const { id } = req.params;
  let query = 'UPDATE usuarios SET nombre = $1, email = $2, rol = $3 WHERE id = $4 RETURNING id, nombre, email, rol';
  let params = [nombre, email, rol, id];
  
  if (password) {
    const password_hash = await bcrypt.hash(password, 10);
    query = 'UPDATE usuarios SET nombre = $1, email = $2, password_hash = $3, rol = $4 WHERE id = $5 RETURNING id, nombre, email, rol';
    params = [nombre, email, password_hash, rol, id];
  }

  try {
    const result = await db.query(query, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error al actualizar el usuario.');
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado.' });
    }
    res.json({ msg: 'Usuario eliminado correctamente.' });
  } catch (err) {
    res.status(500).send('Error al eliminar el usuario.');
  }
};