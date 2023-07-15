const Cliente = require('../models/cliente');

/**
 * 
 * @param {*} req : Obtiene los parámetros envíados por la URL
 * @param {*} res : Intercambio de mensaje response
 */
const getColecciones = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    const busqueda = req.params.busqueda;
    console.log(busqueda);
    const tabla = req.params.tabla;
    const regexBus = new RegExp(busqueda, 'i');

    switch (tabla) {
        case 'clientes':
            const [clientes, registro] = await Promise.all(
                [
                    Cliente.find({ nombrerazonsocial: regexBus }).skip(desde).limit(10),
                    Cliente.count()
                ]);
            res.status(200).json(
                {
                    ok: true,
                    clientes,
                    uid: req.uid,
                    registros: registro
                });
            break;
        case 'cliente':
            const [cliente] = await Promise.all(
                [
                    Cliente.find({ nombrerazonsocial: busqueda }),
                ]);
            res.status(200).json(
                {
                    ok: true,
                    cliente,
                    uid: req.uid
                });
            break;
        default:
            res.status(400)
                .json(
                    {
                        ok: false,
                        msg: 'La tabla tiene que ser un objeto persistente válido'
                    }
                )

    }


}

module.exports = {
    getColecciones
}