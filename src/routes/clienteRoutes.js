const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente.js');

// Lidar com o envio do formulário
router.post("/cadastrar", async (req, res) => {
    try {
        const { 
            nome,
            idade,
            sexo,
            dadosCEP
         } = req.body;
    
        const newCliente = new Cliente({
            nome,
            idade,
            sexo,
            cep: dadosCEP.cep,
            endereco: dadosCEP.endereco,
            bairro: dadosCEP.bairro,
            municipio: dadosCEP.municipio,
            numero: dadosCEP.numero,
            uf: dadosCEP.uf
        })

        await newCliente.save();

        res.json("Cadastrado");
    } catch(err) {
        console.log({
            msg: "Erro ao cadastrar cliente",
            err
        })
    }
})

router.get("/clientes", async (req, res) => {
    try {
        const startTime = process.hrtime();
        const clientes = await Cliente.find();
        const endTime = process.hrtime(startTime);

        console.log((endTime[0] * 1e9 + endTime[1]) / 1e9);

        res.json(clientes);
    } catch(err) {
        res.json({
            msg: "Erro ao consultar clientes",
            err
        })
    }
})

router.put("/editar/:id", async (req, res) => {
    try {
        const { 
            nome,
            idade,
            sexo,
            dadosCEP
         } = req.body;
    
        await Cliente.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    nome,
                    idade,
                    sexo,
                    cep: dadosCEP.cep,
                    endereco: dadosCEP.endereco,
                    bairro: dadosCEP.bairro,
                    municipio: dadosCEP.municipio,
                    numero: dadosCEP.numero,
                    uf: dadosCEP.uf
                }
            }
        )
    
        res.json("Cliente editado");
    } catch(err) {
        res.json({
            msg: "Erro ao editar dados do cliente",
            err
        })
    }
})

router.delete("/excluir/:id", async (req, res) => {
    try {
        await Cliente.deleteOne({ _id: req.params.id });

        res.json('Cliente removido');
    } catch(err) {
        res.json({
            msg: "Erro ao remover cliente",
            err
        })
    }
})

module.exports = router;