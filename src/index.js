// Pacote para permitir a leitura do arquivo .env através do objeto `process`
require("dotenv").config();

const path = require("path");
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
})

// Lidar com o envio do formulário
app.post("/cadastrar", (req, res) => {
    const data = req.body;

    
})

// Armazenar as informações do CEP em cache
app.post("/cacheCEP", (req, res) => {
    res.json("Cache dos CEPs");
})

// Rodando o servidor na porta apontada no .env
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});