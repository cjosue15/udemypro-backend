const express = require('express');
const app = express();
const { getUsuarios, createUser, updateUser, getOneUsuario, deleteUser } = require('../controllers/usuario.controller');

app.get('/', getUsuarios);

app.post('/', createUser);

app.put('/:id', updateUser);

app.get('/:id', getOneUsuario);

app.delete('/:id', deleteUser);

module.exports = app;
