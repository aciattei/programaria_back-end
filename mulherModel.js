const mongoose = require('mongoose');

const mulherSchema = new mongoose.Schema({
    imagem: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    citacao: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('diva', mulherSchema);