const mongoose = require('mongoose');


const EquipoShema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    codigo: {
        type: String,
        require: true,
        unique: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    ,
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    }
    ,
    img: {
        type: String
    }
}, { collation: 'equipos' }
);

EquipoShema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = new mongoose.model('Equipo', EquipoShema);