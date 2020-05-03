//importando moongoose
const mongoose = require('mongoose');

//conexion secundaria
const dbTest = 'mongodb://localhost/dbTest';
/*Creando la conexión a la db..
{variable de entorno que contiene la cadena de conexion} || conexion secundaria en caso que no exista una db */
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : dbTest ;
mongoose.connect(URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//verificando el estado de la conexión
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('database is connected');
});