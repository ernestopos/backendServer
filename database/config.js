const mongoose = require('mongoose');

const dbConnection = async (conexion) => {

    try {
        await mongoose.connect(conexion,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true                               
            });
        console.log('DB Online');
    }
    catch (error) {
        console.error(error);
        throw new Error('Se presentó error la hora de establecer conexion con la base de datos');
    }
}

module.exports = {
    dbConnection
}