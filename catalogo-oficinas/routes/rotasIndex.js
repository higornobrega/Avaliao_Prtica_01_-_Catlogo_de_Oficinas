var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js')

/* GET página principal (todas as oficinas). */
router.get('/', controllerIndex.tela_principal);

/* GET visualização das oficinas com inscrições abertas. */
router.get('/abertas', controllerIndex.inscricoes_abertas);

/* GET página sobre */
router.get('/sobre', controllerIndex.sobre);

module.exports = router;
