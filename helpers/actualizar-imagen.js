const Usuario = require('../models/usuario');
const Cliente = require('../models/cliente');
const fs = require('fs');

const borrarImagen = (path) => {
    try {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
        console.log("Delete File successfully.");
    } catch (error) {
        console.log(error);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    switch (tipo) {
        case 'clientes':
            const cliente = await Cliente.findById(id);
            if (!cliente) {
                console.log('No se encontro el cliente');
                return false;
            }
            const pathViejo = `./uploads/clientes/${cliente.img}`;
            borrarImagen(pathViejo);
            cliente.img = nombreArchivo;
            await cliente.save();
            return true;
            break;
        case 'usuarios':
            break;
        default:
            return false;
            break;
    }
}

module.exports = {
    actualizarImagen
}