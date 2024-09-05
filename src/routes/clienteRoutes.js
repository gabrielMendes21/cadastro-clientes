const express = require('express');
const router = express.Router();

(async () => {
    // Conexão com banco de dados
    const conn = require('../db/conn.js');
    const Cliente = await conn();

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
                uf: dadosCEP.uf,
                bairro: dadosCEP.bairro,
                numero: dadosCEP.numero,
                logradouro: dadosCEP.logradouro,
                cidade: dadosCEP.cidade,
            })

            const startTime = process.hrtime();
            await newCliente.save();
            const endTime = process.hrtime(startTime);

            // // Tempo de execução em segundos
            console.log(`Tempo de execução (cadastro): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}`);

            // Tempo de execução em milissegundos
            console.log(`Tempo de execução (cadastro): ${(endTime[0] * 1e9 + endTime[1]) / 1e6}`);

            res.json("Cadastrado");
        } catch(err) {
            console.log({
                msg: "Erro ao cadastrar cliente",
                err
            })
        }
    })

    router.get("/consultar", async (req, res) => {
        try {
            const startTime = process.hrtime();
            const clientes = await Cliente.find();
            const endTime = process.hrtime(startTime);

            // Tempo de execução em segundos
            console.log(`Tempo de execução (consulta): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}`);

            // Tempo de execução em milissegundos
            // console.log(`Tempo de execução (consulta): ${(endTime[0] * 1e9 + endTime[1]) / 1e6}`);

            // Converter documentos para objetos simples
            const processedClientes = clientes.map(cliente => cliente.toObject());

            // Renderizar a página Handlebars com os dados dos clientes processados
            res.render("consultar", { clientes: processedClientes });

            // res.json(clientes);
        } catch(err) {
            res.json({
                msg: "Erro ao consultar clientes",
                err
            })
        }
    })

    //rota para redirecionar para a page de edição
    router.get("/editCliente/:id", async (req, res) => {
        try {
            const startTime = process.hrtime();
            const clienteEspecifico = await Cliente.findById(req.params.id);
            const endTime = process.hrtime(startTime);

            // Tempo de execução em segundos
            console.log(`Tempo de execução (consulta): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}`);

            // Tempo de execução em milissegundos
            // console.log(`Tempo de execução (consulta): ${(endTime[0] * 1e9 + endTime[1]) / 1e6}`);


            // Verificar se o cliente foi encontrado
            if (!clienteEspecifico) {
                return res.status(404).send("Cliente não encontrado");
            }

            // Converter o documento para um objeto simples
            const clienteEncontrado = clienteEspecifico.toObject();
            

            // Renderizar a página Handlebars com os dados do cliente processado
            res.render("atualizar", clienteEncontrado);

            // res.json(clientes);
        } catch(err) {
            res.json({
                msg: "Erro ao consultar clientes",
                err
            })
        }
    })


    //rota que realiza a alteração dos dados do cliente
    router.put("/editar/:id", async (req, res) => {
        try {
            const { 
                nome,
                idade,
                sexo,
                dadosCEP
            } = req.body;
         
            const startTime = process.hrtime();
            await Cliente.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        nome,
                        idade,
                        sexo,
                        cep: dadosCEP.cep,
                        uf: dadosCEP.uf,
                        bairro: dadosCEP.bairro,
                        numero: dadosCEP.numero,
                        logradouro: dadosCEP.logradouro,
                        cidade: dadosCEP.cidade,
                    }
                }
            )
            const endTime = process.hrtime(startTime);

            // Tempo de execução em segundos
            console.log(`Tempo de execução (edição): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}`);

            // Tempo de execução em milissegundos
            // console.log(`Tempo de execução (edição): ${(endTime[0] * 1e9 + endTime[1]) / 1e6}`);
        
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
            const startTime = process.hrtime();
            await Cliente.deleteOne({ _id: req.params.id });
            const endTime = process.hrtime(startTime);

            // Tempo de execução em segundos
            console.log(`Tempo de execução (exclusão): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}`);

            // Tempo de execução em milissegundos
            // console.log(`Tempo de execução (exclusão): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}`);

            res.json('Cliente removido');
        } catch(err) {
            res.json({
                msg: "Erro ao remover cliente",
                err
            })
        }
    })

})()

module.exports = router;