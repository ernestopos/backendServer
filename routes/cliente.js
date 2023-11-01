/* 
    .: API Rest: Para el manejo de los equipos
    /api/cliente
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getClientes, crearClientes, actualizarClientes, eliminarClientes, buscarClientes } = require('../controllers/cliente');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
router.get('/', validarJWT, getClientes);
router.get('/buscar/:nombrerazonsocial', validarJWT, buscarClientes);

router.post('/',
    [
        validarJWT,
        check('nombrerazonsocial', 'El nombre ó razón social es obligatorio').not().isEmpty(),
        check('apellido', 'El codigo es obligatorio').not().isEmpty(),
        check('tipodocumento', 'El tipo de documento es obligatorio').not().isEmpty(),
        check('numerodocumento', 'El usuario es obligatorio').not().isEmpty(),
        check('email', 'Ingrese un email correcto').isEmail(),
        validarCampos
    ], crearClientes);

router.put('/:id',
    [
        validarJWT,
        check('nombrerazonsocial', 'El nombre ó razón social es obligatorio').not().isEmpty(),
        check('apellido', 'El codigo es obligatorio').not().isEmpty(),
        check('tipodocumento', 'El usuario es obligatorio').not().isEmpty(),
        check('numerodocumento', 'El usuario es obligatorio').not().isEmpty(),
        check('email', 'Ingrese un email correcto').isEmail(),
        validarCampos
    ], actualizarClientes);

router.delete('/:id', validarJWT, eliminarClientes);
module.exports = router;