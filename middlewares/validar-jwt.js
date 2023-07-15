const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status('401').json(
            {
                ok: false,
                msg: 'La petición no tiene token'
            }
        );
    }

    try {
        console.log("process.env.JWT_SECRET: ",process.env.JWT_SECRET);
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
    } catch (error) {
        return res.status('401').json(
            {
                ok: false,
                msg: 'Token no válido'
            }
        );
    }
    next();  
}

module.exports = {
    validarJWT
}