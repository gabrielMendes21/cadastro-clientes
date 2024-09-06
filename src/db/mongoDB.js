const mongoose = require('mongoose');

const conn = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`);

        console.log("Conectado ao banco mongodb");
    } catch(err) {
        console.log(err);
    }
}

module.exports = conn;