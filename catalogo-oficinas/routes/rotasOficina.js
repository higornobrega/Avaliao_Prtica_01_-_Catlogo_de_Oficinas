var express = require('express');
var router = express.Router();
var controllerOficina = require('../controller/controllerOficina.js')

/* GET Cria Oficina (formulário). */
router.get('/cria', controllerOficina.cria_get);

/* POST Cria Oficina (recebe dados do formulário). */
router.post('/cria', controllerOficina.cria_post);

/* GET Consulta Oficina. */
router.get('/consulta/:id_oficina', controllerOficina.consulta);

/* GET Altera Oficina (formulário). */
router.get('/altera/:id_oficina', controllerOficina.altera_get);

/* POST Altera Oficina (recebe dados do formulário). */
router.post('/altera/:id_oficina', controllerOficina.altera_post);

/* GET Encerra as inscrições da Oficina. */
router.get('/encerra/:id_oficina', controllerOficina.encerra);

/* GET Reabre as inscrições da Oficina. */
router.get('/reabre/:id_oficina', controllerOficina.reabre);

/* GET Exclui Oficina (após confirmação na janela modal). */
router.get('/deleta/:id_oficina', controllerOficina.deleta);

/* GET Pesquisa Oficina (formulário). */
router.get('/pesquisa', controllerOficina.pesquisa_get);

/* POST Pesquisa Oficina (recebe o termo e exibe o resultado na mesma página). */
router.post('/pesquisa', controllerOficina.pesquisa_post);

module.exports = router;
