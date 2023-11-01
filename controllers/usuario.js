const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

//Método para obtener datos de un usuario
const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, "nombre email role google");
    res.status(200).json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}
//Método para crear un usuario
const crearUsuarios = async (req, res) => {
    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email que intenta crear ya existe en el sistema'
            });
        }

        const usuario = new Usuario(req.body);
        // Encriptar los datos de la contraseña en la base de datos.
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // se guarda la constraseña encriptada
        
        const token = await generarJWT(usuario.id);      
        await usuario.save();

        res.status(200).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, por favor revisar los logs'
        });
    }
}
//Método para actualizar los datos de un usuario
const actualizarUsuarios = async (req, res) => {
    try {

        const uid = req.params.id;

        const existeUID = await Usuario.findById(uid);

        if (!existeUID) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'El usuario que desea modificar no existe'
                }
            );
        }

        // Actualización del usuario
        const { password, google, ...campos } = req.body;

        if (campos.email !== existeUID.email) {
            const emailValidation = campos.email;
            const existeEmail = await Usuario.findOne({ 'email': emailValidation });

            console.log('email encontrado : ', existeEmail);

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El email que intenta actualizar ya se encuentra asignado a otro usuario'
                });
            }
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Registro actualizado correctamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, por favor revisar los logs'
        });
    }
}

//Método para actualizar los datos de un usuario
const eliminarUsuarios = async (req, res) => {
    try {

        const uid = req.params.id;
        const existeUID = await Usuario.findById(uid);
        if (!existeUID) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'El usuario que desea eliminar no existe'
                }
            );
        }
        await Usuario.deleteOne({ id: existeUID.id });
        res.status(200).json({
            ok: true,
            msg: 'Registro eliminado correctamente',
            usuario: existeUID
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, por favor revisar los logs'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    eliminarUsuarios
}