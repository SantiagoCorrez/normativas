const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const subcategoriasController = require('../controllers/subcategoriasController');

router.get('/', subcategoriasController.getSubcategorias);

module.exports = router;