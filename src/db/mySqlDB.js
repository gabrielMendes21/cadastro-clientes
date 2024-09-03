const sequelize = require("sequelize")

const conn = () => {
    const db = new sequelize(process.env.DBNAME, "root", "", {
        host: "localhost",
        dialect: "mysql"
    })
    
    return {
        sequelize,
        db
    }
}

module.exports = conn;