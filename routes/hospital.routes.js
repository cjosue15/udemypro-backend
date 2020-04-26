const express = require('express');

const app = express();

const { getHospitales, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital.controller');

const { verificarToken, verificaRol } = require('../middlewares/middlewares');

app.get('/', verificarToken, getHospitales);

app.post('/', [verificarToken, verificaRol], createHospital);

app.put('/:id', [verificarToken, verificaRol], updateHospital);

app.delete('/:id', [verificarToken, verificaRol], deleteHospital);

module.exports = app;
