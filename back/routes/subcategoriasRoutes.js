const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const subcategoriasController = require('../controllers/subcategoriasController');

router.use(auth.verifyToken);
router.use(auth.checkRole(['admin']));

router.get('/', subcategoriasController.getSubcategorias);
router.post('/', subcategoriasController.createSubcategoria);
router.put('/:id', subcategoriasController.updateSubcategoria);
router.delete('/:id', subcategoriasController.deleteSubcategoria);

module.exports = router;