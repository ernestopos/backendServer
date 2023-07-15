const jwt = require('jsonwebtoken');


const generarJWT = async (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };
        jwt.sign(payload, process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            },
            (err, token) => {
                if (err) {
                    reject('No se pudo generar el JWT');
                } else {
                    resolve(token);
                }
            });
    });
}

module.exports = {
    generarJWT
}