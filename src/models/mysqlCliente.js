const conn = require('../db/conn.js');

const createMySqlCliente = async () => {
    const { db, sequelize } = await conn();

    if (db && sequelize) {
        const Cliente = db.define('clientes', {
            nome:{
                type: sequelize.STRING
            },
            idade:{
                type: sequelize.INTEGER
            },
            sexo:{
                type: sequelize.STRING
            },
            cep:{
                type: sequelize.STRING
            },
            uf:{
                type: sequelize.STRING
            },
            bairro:{
                type: sequelize.STRING
            },
            numero:{
                type: sequelize.STRING
            },
            logradouro:{
                type: sequelize.STRING
            },
            cidade:{
                type: sequelize.STRING
            }
        });
        
        Cliente.sync();
        
        return Cliente;
    }
}



module.exports = createMySqlCliente;