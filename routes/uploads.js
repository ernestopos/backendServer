/**
 * API: Especializada en Subida de archivos al servidor
  */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUploads, getImage } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');

const router = new Router();
router.use(expressFileUpload());
router.put('/:tipo/:id', validarJWT, fileUploads);
router.get('/:tipo/:foto', validarJWT, getImage);

module.exports = router;