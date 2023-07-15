const Cliente = require('../models/cliente');

//Método para obtener datos de los clientes
const getClientes = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [clientes, registro] = await Promise.all(
        [
            Cliente.find({}, "nombrerazonsocial numerodocumento")
                .skip(desde)
                .limit(10),
            Cliente.count()
        ]
    );
    res.status(200).json({
        ok: true,
        clientes,
        uid: req.uid,
        registros: registro
    });
}
// Método que se emplea para realizar las búsquedas de los clientes.
const buscarClientes = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    const razonsocial = req.params.nombrerazonsocial;
    const regex = new RegExp(razonsocial, 'i');

    const [clientes, registro] = await Promise.all(
        [
            Cliente.find({ nombrerazonsocial: regex })
                .skip(desde)
                .limit(10),
            Cliente.count()
        ]
    );
    console.log(clientes);
    res.status(200).json({
        ok: true,
        clientes,
        uid: req.uid,
        registros: registro
    });
}

//Método para crear un cliente
const crearClientes = async (req, res) => {
    const { numerodocumento } = req.body;
    try {
        const existeCodigo = await Cliente.findOne({ numerodocumento });
        console.log(existeCodigo);
        if (existeCodigo) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente que intenta crear con el número de documento ya existe'
            });
        }
        const cliente = new Cliente(req.body);
        await cliente.save();

        res.status(200).json({
            ok: true,
            cliente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, por favor revisar los logs'
        });
    }
}

//Método para actualizar los datos del cliente
const actualizarClientes = async (req, res) => {
    try {

        const uid = req.params.id;
        const existeUID = await Cliente.findById(uid);

        if (!existeUID) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'El cliente que intenta actualizar no existe'
                }
            );
        }

        // Actualización del cliente
        const { numerodocumento, ...campos } = req.body;
        if (campos.numerodocumento !== existeUID.numerodocumento) {
            const numerodocumentoValidation = campos.numerodocumento;
            const existeNumero = await Cliente.findOne({ 'numerodocumento': numerodocumentoValidation });

            if (existeNumero) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El número de documento que intenta actualizar ya se encuentra asignado a otro cliente'
                });
            }
        }
        const clienteActualizado = await Cliente.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Registro actualizado correctamente',
            equipo: clienteActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, por favor revisar los logs'
        });
    }
}

//Método para eliminar los datos de un cliente
const eliminarClientes = async (req, res) => {
    try {

        const uid = req.params.id;
        const existeUID = await Cliente.findById(uid);

        if (!existeUID) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'El cliente que desea eliminar no existe'
                }
            );
        }
        await Cliente.deleteOne({ id: existeUID.id });
        res.status(200).json({
            ok: true,
            msg: 'Registro eliminado correctamente',
            cliente: existeUID
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
    getClientes,
    crearClientes,
    actualizarClientes,
    eliminarClientes,
    buscarClientes
}