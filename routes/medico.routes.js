const express = require('express');

const app = express();

const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medico.controller');

const { verificarToken, verificaRol } = require('../middlewares/middlewares');

app.get('/', verificarToken, getMedicos);

app.post('/', [verificarToken, verificaRol], createMedico);

app.put('/:id', [verificarToken, verificaRol], updateMedico);

app.delete('/:id', [verificarToken, verificaRol], deleteMedico);

module.exports = app;
