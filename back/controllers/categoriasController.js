const db = require('../db/db');

// Obtener todas las categorías
exports.getCategorias = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM categorias ORDER BY nombre ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error al obtener las categorías.');
  }
};

// Crear una nueva categoría
exports.createCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await db.query('INSERT INTO categorias (nombre) VALUES ($1) RETURNING *', [nombre]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Código de error para duplicados
      return res.status(409).json({ msg: 'Ya existe una categoría con ese nombre.' });
    }
    res.status(500).send('Error al crear la categoría.');
  }
};

// Actualizar una categoría
exports.updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await db.query('UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Categoría no encontrada.');
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ msg: 'Ya existe otra categoría con ese nombre.' });
    }
    res.status(500).send('Error al actualizar la categoría.');
  }
};

// Eliminar una categoría
exports.deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Categoría no encontrada.');
    }
    res.json({ msg: 'Categoría eliminada con éxito.' });
  } catch (err) {
    if (err.code === '23503') { // Error de clave foránea
      return res.status(409).json({ msg: 'No se puede eliminar la categoría porque está asociada a normativas o subcategorías.' });
    }
    res.status(500).send('Error al eliminar la categoría.');
  }
};