const express = require('express');
const { consultar, cadastrar, renderEditar, editar, excluir } = require('../middlewares/cliente.js');
const router = express.Router();

// Lidar com o envio do formulário
router.post("/cadastrar", cadastrar);

router.get("/clientes", consultar);

//rota para redirecionar para a page de edição
router.get("/editCliente/:id", renderEditar);

//rota que realiza a alteração dos dados do cliente
router.put("/editar/:id", editar);

router.delete("/excluir/:id", excluir);


module.exports = router;