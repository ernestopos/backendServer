const Equipo = require('../models/equipo');

//Método para obtener datos de los equipos
const getEquipos = async (req, res) => {
    const equipos = await Equipo.find({}, "nombre codigo {nombre}");
    res.status(200).json({
        ok: true,
        equipos,
        uid: req.uid
    });
}
//Método para crear un equipo
const crearEquipos = async (req, res) => {
    const { codigo } = req.body;
    try {
        const existeCodigo = await Equipo.findOne({ codigo });
        if (existeCodigo) {
            return res.status(400).json({
                ok: false,
                msg: 'El equipo que intenta crear con el código ingresado ya existe'
            });
        }
        const equipo = new Equipo(req.body);
        await equipo.save();
        res.status(200).json({
            ok: true,
            equipo
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, por favor revisar los logs'
        });
    }
}
//Método para actualizar los datos de un equipo
const actualizarEquipos = async (req, res) => {
    try {

        const uid = req.params.id;
        const existeUID = await Equipo.findById(uid);

        if (!existeUID) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'El equipo que intenta actualizar no existe'
                }
            );
        }
        // Actualización del equipo
        const { codigo, ...campos } = req.body;
        if (campos.codigo !== existeUID.codigo) {
            const codigoValidation = campos.email;
            const existeCodigo = await Equipo.findOne({ 'codigo': codigoValidation });

            console.log('codigo encontrado : ', existeCodigo);
            if (existeCodigo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El código que intenta actualizar ya se encuentra asignado a otro equipo'
                });
            }
        }
        const equipoActualizado = await Equipo.findByIdAndUpdate(uid, campos, { new: true });
        console.log(equipoActualizado);
        res.status(200).json({
            ok: true,
            msg: 'Registro actualizado correctamente',
            equipo: equipoActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, por favor revisar los logs'
        });
    }
}

//Método para eliminar los datos de un equipo
const eliminarEquipos = async (req, res) => {
    try {

        const uid = req.params.id;
        const existeUID = await Equipo.findById(uid);

        if (!existeUID) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'El equipo que desea eliminar no existe'
                }
            );
        }
        await Equipo.deleteOne({ id: existeUID.id });
        res.status(200).json({
            ok: true,
            msg: 'Registro eliminado correctamente',
            equipo: existeUID
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
    getEquipos,
    crearEquipos,
    actualizarEquipos,
    eliminarEquipos
}