const express = require('express');
const app = express();
const { getUsuarios, createUser } = require('../controllers/usuario.controller');

app.get('/', getUsuarios);

app.post('/', createUser);

module.exports = app;
