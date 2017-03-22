'use strict';

const mongoose = require('mongoose');
const app = require('./app');
let port = process.env.PORT || 3678;

mongoose.connect('mongodb://localhost:27017/cursofavoritos', (err, res) => {
    if (err) {
        throw err;
    }
    else {
        console.log('MongoDB connected.');
        app.listen(port, () => console.log(`API REST favoritos funcionando en http://localhost:${port}`));
    }
});


