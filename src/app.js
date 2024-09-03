// Pacote para permitir a leitura do arquivo .env através do objeto `process`
require("dotenv").config();

const path = require("path");
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const Cliente = require('./models/Cliente.js');

// Conexão com banco local
const conn = require('./db/conn.js');
conn();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
})

// Lidar com o envio do formulário
app.post("/cadastrar", async (req, res) => {
    const data = req.body;
    
    const newCliente = new Cliente({
        nome: "Gabriel",
        idade: 18,
        sexo: "Masculino"
    })

    await newCliente.save();

    res.json("Cadastrado");
})

// Armazenar as informações do CEP em cache
app.post("/cacheCEP", (req, res) => {
    res.json("Cache dos CEPs");
})

// Verificar se o CEP fornecido está em cache
app.get("/cacheCEP", (req, res) => {
    
})

// Rodando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});