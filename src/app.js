// Pacote para permitir a leitura do arquivo .env através do objeto `process`
require("dotenv").config();

const path = require("path");
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const Cliente = require('./models/Cliente.js');

// Cache para os CEPs

// Cache simples
const cache = {};

// Cache com node-cache
// ...

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
app.post("/cacheCEP", async (req, res) => {
    try {
        const { CEP } = req.body;

        const cachedCEP = cache[CEP];

        // Verifica se o CEP fornecido já está em cache
        // Caso ele não esteja, uma nova requisição (cujos dados da resposta serão armazenados em cache) 
        // é feita para a API o ViaCEP para a obtenção do novo CEP
        if (cachedCEP) {
            console.log(cache);
            res.json(cachedCEP);
        } else {
            const response = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
            const CEPData = await response.json();

            // Armazenamento dos dados do CEP em cache
            cache[CEP] = CEPData;

            console.log(cache);

            res.json(CEPData);
        }
    } catch(err) {
        console.log({
            msg: "Erro ao buscar dados do CEP",
            err
        })
    }
})

// Verificar se o CEP fornecido está em cache
app.get("/cacheCEP", (req, res) => {
    
})

// Rodando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});