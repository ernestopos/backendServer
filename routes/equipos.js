/* 
    .: API Rest: Para el manejo de los equipos
    /api/equipo
*/

    const { Router } = require('express');
    const { check } = require('express-validator');
    const { validarCampos } = require('../middlewares/validar-campos');
    const { getEquipos, crearEquipos, actualizarEquipos, eliminarEquipos } = require('../controllers/equipos');
    const { validarJWT } = require('../middlewares/validar-jwt');
    
    
    const router = Router();
    router.get('/', validarJWT, getEquipos);
    
    router.post('/',
        [
            validarJWT,
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('codigo', 'El codigo es obligatorio').not().isEmpty(),
            check('usuario', 'El usuario es obligatorio').not().isEmpty(),
            validarCampos
        ], crearEquipos);
    
    router.put('/:id',
        [
            validarJWT,
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('codigo', 'El codigo es obligatorio').not().isEmpty(),
            check('usuario', 'El usuario es obligatorio').not().isEmpty(),
            validarCampos
        ], actualizarEquipos);
    
    router.delete('/:id', validarJWT, eliminarEquipos);
    module.exports = router;