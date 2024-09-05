const mongoose = require('mongoose');

const createMongoCliente = () => {
    const { Schema } = mongoose;

    // Criação do schema para o model Cliente
    const clienteSchema = new Schema({
        nome: {
            type: String,
            required: true
        },
        idade: {
            type: Number,
            required: true
        },
        sexo: {
            type: String,
            required: true
        },
        cep: {
            type: String,
            required: true
        },
        uf: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        logradouro: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        }
    }, { timestamps: true });

    // Criação do model Cliente, baseado no schema criado
    const Cliente = mongoose.model('Cliente', clienteSchema);

    return Cliente
}

module.exports = createMongoCliente