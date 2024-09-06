const sequelize = require("sequelize")

const conn = () => {
    const db = new sequelize(process.env.DBNAME, "root", "", {
        host: "localhost",
        dialect: "mysql"
    })

    console.log("Conectado ao banco mysql");
    
    return {
        sequelize,
        db
    }
}

module.exports = conn;