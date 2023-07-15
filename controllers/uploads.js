
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');


const getImage = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    res.sendFile(pathImg);

    /*return res.status(400)
        .json({
            ok: true,
            msg: 'Ingreso correcto al path'
        });*/
}

const fileUploads = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['usuarios', 'clientes'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El path no es válido'
        });
    }

    // Validar que existe el archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValida = ['png', 'jpg', 'jepg', 'gif'];
    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'La extensión que intenta cargar no es válida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Generación del path
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al cargar la imagen'
            });
        }

        // Actualizar Base de datos.
        actualizarImagen(tipo, id, nombreArchivo);

        res.json(
            {
                ok: true,
                msg: 'Archivo subido correctamente',
                nombreArchivo
            });
    });



}
module.exports = {
    fileUploads,
    getImage
};