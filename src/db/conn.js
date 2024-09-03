const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/clientes-db');

        console.log("Conectado ao banco local");
    } catch(err) {
        console.log(err);
    }
}

module.exports = connect;