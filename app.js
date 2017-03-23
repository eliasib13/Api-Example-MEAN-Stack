'use strict';

const express = require('express');
const bodyParser = require('body-parser');
let api = require('./routes/FavoritoRoutes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE');

    next();
});

app.use('/api', api);

module.exports = app;