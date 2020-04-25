const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'ga' });
});

app.use('/usuarios', require('./usuario.routes'));

app.use('/login', require('./login.routes'));

module.exports = app;
