const mongoConn = require('./mongoDB.js');

const createMySqlCliente = require('../models/mysqlCliente.js');
const createMongoCliente = require('../models/mongoCliente.js');
const mySqlConn = require('./mySqlDB.js');
require('dotenv').config();

const conn = async () => {
    const db = process.env.DBTYPE;

    switch(db) {
        case 'mongodb':
            await mongoConn();
            const mongoCliente = createMongoCliente();
            return mongoCliente;
        case 'mysql':
            mySqlConn();
            const mySqlCliente = await createMySqlCliente();
            return mySqlCliente;
        default: 
            console.log("Banco de dados inválido");
            break;
    }
}

module.exports = conn;