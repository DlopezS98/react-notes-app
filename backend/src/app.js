const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json()); //metodo para la trasnferencia de archivos json

//routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/notes', require('./routes/notes.routes'));

module.exports = app;