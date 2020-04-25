const express = require('express');
const app = express();
const { getUsuarios, createUser, updateUser, getOneUsuario, deleteUser } = require('../controllers/usuario.controller');
const { verificarToken, verificaRol } = require('../middlewares/middlewares');

app.get('/', verificarToken, getUsuarios);

app.post('/', [verificarToken, verificaRol], createUser);

app.put('/:id', [verificarToken, verificaRol], updateUser);

app.get('/:id', getOneUsuario);

app.delete('/:id', [verificarToken, verificaRol], deleteUser);

module.exports = app;
