const { response } = require('express');
const Usuario = require('../models/usuario');
const bycrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const googleSingIn = async (req, res = response) => {

    try {

        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar usuario
        await usuario.save();
        // Generar TOKEN - JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            email, name, picture,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status('400')
            .json({
                ok: false,
                msg: 'El token de Google no es correcto'
            });
    }


}


const login = async (req, res = response) => {
    try {

        const { email, password } = req.body;

        const usuarioDB = await Usuario.findOne({ email });

        // Verificar el email
        if (!usuarioDB) {
            return res.status('404')
                .json({
                    ok: false,
                    msg: 'Login fallido, por favor consultar con el administrador'
                });
        }

        // Verificar password
        const validarPassword = bycrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status('404')
                .json({
                    ok: false,
                    msg: 'Login fallido, por favor consultar con el administrador'
                });
        }

        const token = await generarJWT(usuarioDB.id);

        res.json(
            {
                ok: true,
                token
            });
    } catch (error) {
        console.log(error);
        res.status('500').json(
            {
                ok: false,
                msg: "Se presentó un error al intentar loguearse en la aplicación"
            });
    }
}

module.exports = {
    login,
    googleSingIn
}