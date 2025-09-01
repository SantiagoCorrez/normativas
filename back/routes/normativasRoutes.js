const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET /api/normativas - Obtener todas las normativas (público)
router.get('/', async (req, res) => {
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

// GET /api/normativas/:id - Obtener una normativa por ID (público)
router.get('/:id', async (req, res) => {
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

module.exports = router;