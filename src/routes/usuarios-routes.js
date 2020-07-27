const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios-controller');

router.get('/usuarios', usuariosController.listUsuarios);
router.post('/usuarios', usuariosController.createUsuarios);
router.get('/usuarios/:usuarioID', usuariosController.listUsuariosByID);
router.put('/usuarios/:usuarioID', usuariosController.UpdateUsuario);
router.delete('/usuarios/:usuarioID', usuariosController.DeleteUsuarioByID);

module.exports = router;