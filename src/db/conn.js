const mongoConn = require('./mongoDB.js');
const createMongoCliente = require('../models/mongoCliente.js');

const mySqlConn = require('./mySqlDB.js');
const createMySqlCliente = require('../models/mysqlCliente.js');

require('dotenv').config();

const conn = async () => {
    const db = process.env.DBTYPE;

    switch(db) {
        case 'mongodb':
            await mongoConn();
            const mongoCliente = createMongoCliente();
            return mongoCliente;
        case 'mysql':
            const { db, sequelize } = mySqlConn();
            const mySqlCliente = createMySqlCliente(db, sequelize);
            return mySqlCliente;
        default: 
            console.log("Banco de dados inválido");
            break;
    }
}

module.exports = conn;