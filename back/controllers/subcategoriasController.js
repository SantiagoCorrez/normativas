const db = require('../db/db');

// Obtener todas las subcategorías (con opción de filtrar por categoría_id)
exports.getSubcategorias = async (req, res) => {
  const { categoria_id } = req.query;
  try {
    let query = 'SELECT * FROM subcategorias';
    const params = [];

    if (categoria_id) {
      query += ' WHERE categoria_id = $1';
      params.push(categoria_id);
    }
    query += ' ORDER BY nombre ASC';
    
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error al obtener las subcategorías.');
  }
};

// Crear una nueva subcategoría
exports.createSubcategoria = async (req, res) => {
  const { nombre, categoria_id } = req.body;
  try {
    const result = await db.query('INSERT INTO subcategorias (nombre, categoria_id) VALUES ($1, $2) RETURNING *', [nombre, categoria_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error al crear la subcategoría.');
  }
};

// Actualizar una subcategoría
exports.updateSubcategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria_id } = req.body;
  try {
    const result = await db.query('UPDATE subcategorias SET nombre = $1, categoria_id = $2 WHERE id = $3 RETURNING *', [nombre, categoria_id, id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Subcategoría no encontrada.');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error al actualizar la subcategoría.');
  }
};

// Eliminar una subcategoría
exports.deleteSubcategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM subcategorias WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Subcategoría no encontrada.');
    }
    res.json({ msg: 'Subcategoría eliminada con éxito.' });
  } catch (err) {
    if (err.code === '23503') { // Error de clave foránea
      return res.status(409).json({ msg: 'No se puede eliminar la subcategoría porque está asociada a normativas.' });
    }
    res.status(500).send('Error al eliminar la subcategoría.');
  }
};