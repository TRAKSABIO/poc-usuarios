const express = require('express');
const router = express.Router();
const planosController = require('../controllers/planos-controller');

router.post('/usuarios/:usuarioID/planos', planosController.createPlano);
router.get('/usuarios/:usuarioID/planos', planosController.listPlanos);
router.get('/usuarios/:usuarioID/planos/:planoID', planosController.listPlanosByIDPlano);
router.delete('/usuarios/:usuarioID/planos/:planoID', planosController.DeletePlano);

module.exports = router;