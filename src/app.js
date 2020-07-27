const express = require('express');
var bodyParser = require('body-parser')

//conecta-se ao mongo
const mongoose = require('mongoose');

//Realiza a leitura do arquivo de configuracao .env
require('dotenv').config();

// App
const app = express();

// create application/json parser
//var jsonParser = bodyParser.json()

// Correga os modelos
const Usuarios = require('./models/usuarios');
const Planos = require('./models/planos');

// Leitura das rotas
const indexRoutes = require('../src/routes/routes');
const usuariosRoutes = require('./routes/usuarios-routes');
const planoRoutes = require('./routes/planos-routes');

app.use(bodyParser.json())

//app.use(express.bodyParser());
app.use('/', indexRoutes);
app.use('/Usuarios/v1', usuariosRoutes, planoRoutes);
//app.use('/Usuarios/v1', planoRoutes);

// configuracoes do banco de dados
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true 
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

module.exports = app;
