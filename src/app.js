// Pacote para permitir a leitura do arquivo .env através do objeto `process`
require("dotenv").config();

const path = require("path");
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars');

const CEPRoutes = require('./routes/CEPRoutes.js');
const clienteRoutes = require('./routes/clienteRoutes.js');


//-handlebars
app.set('views', path.join(__dirname, 'views'));

const handlebars = require("express-handlebars").engine

app.engine("handlebars", handlebars({
    defaultLayout: "main"
}))

app.set("view engine", "handlebars")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use(CEPRoutes);
app.use(clienteRoutes);

// // Configuração do motor de visualização Handlebars
// app.engine('hbs', exphbs.engine({
//     extname: '.hbs', // Define a extensão dos arquivos de visualização como .hbs
//     runtimeOptions: {
//         allowProtoPropertiesByDefault: true // Permite acesso a propriedades do protótipo no Handlebars
//     }
// }));// funcionou para listar clientes

//rota page inicial
app.get('/', (req, res) => {
    res.render('index'); // Tenta renderizar a view 'index.ejs'
});

//rota de login
app.get('/login', (req, res) => {
    res.render('login'); 
});

// Rodando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});