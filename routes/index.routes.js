const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'ga' });
});

app.use('/usuarios', require('./usuario.routes'));

app.use('/hospitales', require('./hospital.routes'));

app.use('/medicos', require('./medico.routes'));

app.use('/login', require('./login.routes'));

module.exports = app;
