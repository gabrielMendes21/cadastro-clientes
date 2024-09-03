// Pacote para permitir a leitura do arquivo .env através do objeto `process`
require("dotenv").config();

const path = require("path");
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

const CEPRoutes = require('./routes/CEPRoutes.js');
const clienteRoutes = require('./routes/clienteRoutes.js');

// Conexão com banco local
const conn = require('./db/conn.js');
conn();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use(CEPRoutes);
app.use(clienteRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
})

// Rodando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});