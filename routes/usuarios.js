/*
    API Route : /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
router.get('/', validarJWT, getUsuarios);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'Ingrese un email correcto').isEmail(),
        validarCampos
    ], crearUsuarios);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Ingrese un email correcto').isEmail(),
        check('role', 'Ingrese el role').not().isEmpty(),
        validarCampos
    ], actualizarUsuarios);

router.delete('/:id', validarJWT, eliminarUsuarios);


module.exports = router;