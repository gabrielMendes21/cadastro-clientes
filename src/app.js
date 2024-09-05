// Pacote para permitir a leitura do arquivo .env através do objeto `process`
require("dotenv").config();

const path = require("path");
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const CEPRoutes = require('./routes/CEPRoutes.js');
const clienteRoutes = require('./routes/clienteRoutes.js');


// handlebars
app.set('views', path.join(__dirname, 'views'));

const handlebars = require("express-handlebars").engine;

app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use(CEPRoutes);
app.use(clienteRoutes);

//rota page inicial
app.get('/', (req, res) => {
    res.render('index'); // Tenta renderizar a view 'index.ejs'
});

// Rodando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});