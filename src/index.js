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

app.post("/cadastrar", (req, res) => {
    const data = req.body;

    
})

// Rodando o servidor na porta apontada no .env
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});