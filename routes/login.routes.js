const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const Usuario = require('../models/Usuario');

app.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ succes: false, error: 'Credenciales Incorrectas - email' });
        }

        if (!bcrypt.compareSync(password, usuario.password)) {
            return res.status(400).json({ succes: false, error: 'Credenciales Incorrectas - password' });
        }

        const token = jwt.sign({ usuario }, process.env.SEED, { expiresIn: 14400 });

        res.status(200).json({ succes: true, usuario, id: usuario._id, token });
    } catch (error) {
        res.status(500).json({ succes: false, error, message: 'Fallo al loguearse' });
    }
});

module.exports = app;
