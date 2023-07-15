const mongoose = require('mongoose');

const ClienteShema = new mongoose.Schema({
    nombrerazonsocial: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true,
        unique: true
    },
    tipodocumento: {
        type: String,
        require: true,
        default: 'CC'
    },
    numerodocumento: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }, img: {
        type: String
    },
}
);

ClienteShema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = new mongoose.model('clientes', ClienteShema);