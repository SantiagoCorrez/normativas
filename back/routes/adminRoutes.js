const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db/db');

// Rutas protegidas con el middleware de autenticación
//router.use(auth);
router.get('/normativas', async (req, res) => {
  const { q, categoria_id, subcategoria_id } = req.query;
  let query = 'SELECT * FROM normativas WHERE 1=1';
  const params = [];

  if (q) {
    params.push(`%${q}%`);
    query += ' AND (titulo ILIKE $1 OR normativa ILIKE $1)';
  }
  if (categoria_id) {
    params.push(categoria_id);
    query += ` AND categoria_id = $${params.length}`;
  }
  if (subcategoria_id) {
    params.push(subcategoria_id);
    query += ` AND subcategoria_id = $${params.length}`;
  }

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).send('Error al buscar normativas.');
  }
});

router.get('/normativas/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM normativas WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Normativa no encontrada.');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error del servidor.');
  }
});
// POST /api/admin/normativas - Crear nueva normativa
router.post('/normativas', async (req, res) => {
  const {
    titulo,
    normativa,
    categoria_id,
    subcategoria_id,
    numero_acto,
    tipo_acto,
    fecha_expedicion,
    dependencia_expide,
    epigrafe,
    estado_acto,
    observaciones
  } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO normativas (
        titulo, normativa, categoria_id, subcategoria_id,
        numero_acto, tipo_acto, fecha_expedicion, dependencia_expide,
        epigrafe, estado_acto, observaciones
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        titulo,
        normativa,
        categoria_id,
        subcategoria_id,
        numero_acto,
        tipo_acto,
        fecha_expedicion,
        dependencia_expide,
        epigrafe,
        estado_acto,
        observaciones
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error al crear normativa.');
  }
});

// PUT /api/admin/normativas/:id - Actualizar normativa
router.put('/normativas/:id', async (req, res) => {
  const {
    titulo,
    normativa,
    categoria_id,
    subcategoria_id,
    numero_acto,
    tipo_acto,
    fecha_expedicion,
    dependencia_expide,
    epigrafe,
    estado_acto,
    observaciones
  } = req.body;
  try {
    const result = await db.query(
      `UPDATE normativas SET
        titulo = $1,
        normativa = $2,
        categoria_id = $3,
        subcategoria_id = $4,
        numero_acto = $5,
        tipo_acto = $6,
        fecha_expedicion = $7,
        dependencia_expide = $8,
        epigrafe = $9,
        estado_acto = $10,
        observaciones = $11
      WHERE id = $12 RETURNING *`,
      [
        titulo,
        normativa,
        categoria_id,
        subcategoria_id,
        numero_acto,
        tipo_acto,
        fecha_expedicion,
        dependencia_expide,
        epigrafe,
        estado_acto,
        observaciones,
        req.params.id
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Normativa no encontrada.');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error al actualizar normativa.');
  }
});

// DELETE /api/admin/normativas/:id - Eliminar normativa
router.delete('/normativas/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM normativas WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Normativa no encontrada.');
    }
    res.json({ msg: 'Normativa eliminada.' });
  } catch (err) {
      res.status(500).send('Error al eliminar normativa.');
  }
});

module.exports = router;