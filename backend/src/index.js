//importando las variables de entorno...
require('dotenv').config();
//importando el archivo app que contiene el servidor
const app = require('./app');
//ejecuntando la conexión a la base de datos...
require('./database');

async function main(){
    await app.listen(app.get('port'));
    console.log('server on port', app.get('port'));
}

main();