# Cadastro de clientes
Projeto feito com o objetivo de avaliar o desempenho entre dois bancos de dados (um relacional, e o outro não-relacional) e cachear informações de endereço no servidor.

## Sobre o projeto
O projeto é um simples CRUD, criado com o objetivo de analisar o desempenho das requisições entre dois bancos de dados diferentes, e a diferença entre uma requisção para um recurso que já está em cache e um recurso que precisa ser buscado na API.

### Bancos de dados
A nossa análise utilizou um banco de dados relacional (MySQL) e um não-relacional (MongoDB).

É possível alterar entre os bancos de dados alterando a propriedade DBTYPE do arquivo .env (você deve criar um .env baseado no .env.example).

### Cache
O armazenamento de cache foi feito de uma forma bem simples, utilizando um objeto `cache` para armazenar os dados dos CEPs, visando apenas demonstrar a diferença do tempo que leva para buscar uma informação que já está em cache e uma informação que está em uma API externa.

### Rodando o projeto
* Para rodar o projeto, basta cloná-lo utilizando o seguinte comando: `git clone https://github.com/gabrielMendes21/cadastro-clientes.git`;
* entrar na pasta do projeto com `cd cadastro-clientes`;
* Instalar as dependências: `npm install`;
* Criar o arquivo .env baseado no arquivo `.env.example` e colocar as informações necessárias;
* Criar o banco de dados (MySQL e/ou MongoDB);
* Rodar o servidor com `npm run dev`.
