const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');
const userController = require('../controllers/userController');

// Todas estas rutas deben ser protegidas
//router.use(verifyToken);
//router.use(checkRole(['admin']));

// GET /api/admin/users - Obtener todos los usuarios
router.get('/', userController.getUsers);

// POST /api/admin/users - Crear nuevo usuario
router.post('/', userController.createUser);

// PUT /api/admin/users/:id - Actualizar usuario
router.put('/:id', userController.updateUser);

// DELETE /api/admin/users/:id - Eliminar usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;