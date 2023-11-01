const express = require('express');
const { dbConnection } = require('./database/config')
require('dotenv').config();
const app = express();
const cors = require('cors');
// use the cors middleware
app.use(cors());

// Dar visibilidad a la carpeta pública.
app.use(express.static('public'));

// use the read and parse boody
app.use(express.json());

console.log(process.env.MONGO_DB);

dbConnection(process.env.MONGO_DB, {
    NewUrlParser: true,
    UnifiedTopology: true
});


app.listen(process.env.PORT, () => {
    console.log('El servidor corriendo en el puerto ' + process.env.PORT);
});

//definición de rutas del componente
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/equipo', require('./routes/equipos'));
app.use('/api/cliente', require('./routes/cliente'));
app.use('/api/busquedas',require('./routes/busquedas'));
app.use('/api/upload',require('./routes/uploads'));