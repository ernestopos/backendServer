/**
 * API: Especializada en Búsquedas
 *  
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getColecciones } = require('../controllers/busqueda');

const router = new Router();
router.get('/:tabla/:busqueda', validarJWT, getColecciones);
module.exports = router;