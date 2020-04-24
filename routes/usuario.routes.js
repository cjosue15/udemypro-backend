const express = require('express');
const app = express();
const { getUsuarios, createUser, updateUser } = require('../controllers/usuario.controller');

app.get('/', getUsuarios);

app.post('/', createUser);

app.put('/:id', updateUser);

module.exports = app;
