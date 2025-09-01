const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const categoriasController = require('../controllers/categoriasController');

router.use(auth.verifyToken);
router.use(auth.checkRole(['admin']));

router.get('/', categoriasController.getCategorias);
router.post('/', categoriasController.createCategoria);
router.put('/:id', categoriasController.updateCategoria);
router.delete('/:id', categoriasController.deleteCategoria);

module.exports = router;