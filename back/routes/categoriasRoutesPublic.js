const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const categoriasController = require('../controllers/categoriasController');


router.get('/', categoriasController.getCategorias);

module.exports = router;