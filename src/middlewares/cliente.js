const conn = require('../db/conn.js');
const dbtype = process.env.DBTYPE;

let Cliente;

//bd sql
const post = require("../models/mysqlCliente.js")

// Conexão com banco de dados
conn()
    .then(response => {
        Cliente = response;
    })
    .catch(err => console.log(err));

const consultar = async (req, res) => {
    try {
        if (dbtype == "mongodb") {
            const startTime = process.hrtime();
            const clientes = await Cliente.find();
            const endTime = process.hrtime(startTime);

            // Tempo de execução em segundos
            console.log(`Tempo de execução (consulta): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}s`);

            // Tempo de execução em milissegundos
            // console.log(`Tempo de execução (consulta): ${(endTime[0] * 1e9 + endTime[1]) / 1e6}ms`);

            // Converter documentos para objetos simples
            const processedClientes = clientes.map(cliente => cliente.toObject());

            // Renderizar a página Handlebars com os dados dos clientes processados
            res.render("consultar", { clientes: processedClientes });
        } else if (dbtype == "mysql") {
            Cliente.findAll().then((clientes) => {
                clientes = clientes.map(c => c.dataValues);
                res.render("consultar", { clientes }); 
            }).catch(function(erro){
                console.log("Erro ao carregar dados do banco: " + erro);
                res.status(500).send("Erro ao carregar dados do banco");
            });
        }
    } catch(err) {
        res.json({
            msg: "Erro ao consultar clientes",
            err
        })
    }
}

const cadastrar = async (req, res) => {
    try {
        const { 
            nome,
            idade,
            sexo,
            dadosCEP
        } = req.body;

        if (dbtype == "mongodb") {
        
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
            console.log(`Tempo de execução (cadastro): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}s`);
    
            // Tempo de execução em milissegundos
            // console.log(`Tempo de execução (cadastro): ${(endTime[0] * 1e9 + endTime[1]) / 1e6}ms`);
    
            res.json("Cadastrado");
        } else if (dbtype == "mysql") {
            /* sem teste ainda */
            Cliente.create({
                nome,
                idade,
                sexo,
                cep: dadosCEP.cep,
                uf: dadosCEP.uf,
                bairro: dadosCEP.bairro,
                numero: dadosCEP.numero,
                logradouro: dadosCEP.logradouro,
                cidade: dadosCEP.cidade,
            }).then(() => {
                res.redirect("/clientes");
            }).catch(function(erro){
                res.send("Falha ao cadastrar os dados: " + erro)
            })
        }
    } catch(err) {
        console.log({
            msg: "Erro ao cadastrar cliente",
            err
        })
    }
}

const renderEditar = async (req, res) => {
    try {
        if (dbtype == "mongodb") {
            const startTime = process.hrtime();
            const clienteEspecifico = await Cliente.findById(req.params.id);
            const endTime = process.hrtime(startTime);

            // Tempo de execução em segundos
            console.log(`Tempo de execução (consulta): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}s`);

            // Tempo de execução em milissegundos
            // console.log(`Tempo de execução (consulta): ${(endTime[0] * 1e9 + endTime[1]) / 1e6}ms`);


            // Verificar se o cliente foi encontrado
            if (!clienteEspecifico) {
                return res.status(404).send("Cliente não encontrado");
            }

            // Converter o documento para um objeto simples
            const clienteEncontrado = clienteEspecifico.toObject();

            // Renderizar a página Handlebars com os dados do cliente processado
            res.render("atualizar", clienteEncontrado);
        } else if (dbtype == "mysql") {
            Cliente.findAll({where: {'id': req.params.id}})
                .then(cliente => {
                res.render("atualizar", cliente)
            })
            .catch(erro => {
                console.log("Erro ao carregar dados do banco: " + erro)
            })
        }
    } catch(err) {
        res.json({
            msg: "Erro ao consultar clientes",
            err
        })
    }
}

const editar = async (req, res) => {
    try {
        const { 
            nome,
            idade,
            sexo,
            dadosCEP
        } = req.body;

        if (dbtype == "mongodb") {
            
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
            console.log(`Tempo de execução (edição): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}s`);
    
            // Tempo de execução em milissegundos
            // console.log(`Tempo de execução (edição): ${(endTime[0] * 1e9 + endTime[1]) / 1e6}ms`);
        
            res.json("Cliente editado");
        } else if (dbtype == "mysql") {
            /* sem teste ainda */
            Cliente.update({
                nome,
                idade,
                sexo,
                cep: dadosCEP.cep,
                uf: dadosCEP.uf,
                bairro: dadosCEP.bairro,
                numero: dadosCEP.numero,
                logradouro: dadosCEP.logradouro,
                cidade: dadosCEP.cidade,
            },{
                where: {
                    id: req.params.id
                }
            }).then(function(){
                // Redirecionar após mover o arquivo
                res.redirect("/admin");
            }).catch(function(erro){
                console.error("Erro ao atualizar serviço:", erro);
                res.status(500).send("Erro ao atualizar serviço");
            });
            
        }
    } catch(err) {
        res.json({
            msg: "Erro ao editar dados do cliente",
            err
        })
    }
}

const excluir = async(req, res) => {
    try {
        if (dbtype == "mongodb") {
            const startTime = process.hrtime();
            await Cliente.deleteOne({ _id: req.params.id });
            const endTime = process.hrtime(startTime);

            // Tempo de execução em segundos
            console.log(`Tempo de execução (exclusão): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}s`);

            // Tempo de execução em milissegundos
            // console.log(`Tempo de execução (exclusão): ${(endTime[0] * 1e9 + endTime[1]) / 1e9}ms`);

            res.json('Cliente removido');
        } else if (dbtype == "mysql") {
            //sem teste
            post.Cliente.destroy({where: {'id': req.params.id}}).then(function(){
                res.redirect("/admin")
            }).catch(function(erro){
                console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
            })
        }
    } catch(err) {
        res.json({
            msg: "Erro ao remover cliente",
            err
        })
    }
}

module.exports = {
    consultar,
    cadastrar,
    renderEditar,
    editar,
    excluir
}