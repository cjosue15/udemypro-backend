const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, ['-password', '-__v']);
        res.status(200).json({ succes: true, data: usuarios });
    } catch (error) {
        res.status(500).json({ succes: false, error });
    }
};

const getOneUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findById(id, ['-password', '-__v']);

        if (!usuario) {
            return res.status(404).json({ succes: false, error: `El usuario con id: ${id} no existe` });
        }

        res.status(200).json({ succes: true, data: usuario });
    } catch (error) {
        res.status(400).json({ succes: false, error });
    }
};

const createUser = async (req, res) => {
    try {
        // "nombres": "Miguel Angel",
        // "apellidos": "Morales Larriega",
        // "email": "miguel@gmail.com",
        // "password": "123456",
        // "img": null,
        // "role":"USER_ROLE"

        const { nombres, apellidos, email, password, img, role } = req.body;

        const user = {
            nombres,
            apellidos,
            email,
            password,
        };

        let vacios = {};

        for (const key in user) {
            const element = user[key];

            if (!element || element.length < 0) {
                vacios[key] = 'El campo esta vacio o no se envio';
            }
        }

        if (Object.keys(vacios).length !== 0) {
            return res.status(400).json({ succes: false, errores: vacios });
        }

        const usuario = new Usuario({
            ...user,
            password: bcryptjs.hashSync(password, 10),
            img,
            role,
        });

        await usuario.save();

        res.status(201).json({ succes: true });
    } catch (error) {
        res.status(400).json({ succes: false, error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const { nombres, apellidos, email, img, role } = req.body;

        let usuario = await Usuario.findById(id, ['-password', '-__v']);

        if (!usuario) {
            return res.status(404).json({ succes: false, error: `El usuario con id: ${id} no existe` });
        }

        usuario.nombres = nombres;
        usuario.apellidos = apellidos;
        usuario.email = email;
        usuario.role = role;

        await usuario.save();

        res.status(200).json({ succes: true, message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ succes: false, error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // let usuario = await Usuario.findById(id);

        const usuario = await Usuario.findByIdAndRemove(id);

        if (!usuario) {
            return res.status(404).json({ succes: false, error: `El usuario con id: ${id} no existe` });
        }

        res.status(200).json({ succes: true, message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ succes: false, error });
    }
};

module.exports = {
    getUsuarios,
    createUser,
    updateUser,
    getOneUsuario,
    deleteUser,
};
