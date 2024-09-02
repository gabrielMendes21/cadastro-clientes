const mongoose = require('mongoose');

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
}, { timestamps: true });

// Criação do model Cliente, baseado no schema criado
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente