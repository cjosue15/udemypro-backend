const Medico = require('../models/Medico');

const getMedicos = async (req, res) => {
    try {
        const medicos = await Medico.find({}).populate('usuario', 'nombres email').populate('hospital');

        res.status(200).json({ succes: true, data: medicos });
    } catch (error) {
        res.status(400).json({ succes: false, error });
    }
};

const createMedico = async (req, res) => {
    try {
        const { nombres, apellidos, hospital, img } = req.body;

        const data = {
            nombres,
            apellidos,
            hospital,
        };

        let vacios = {};

        for (const key in data) {
            const element = data[key];

            if (!element || element.length < 0) {
                vacios[key] = 'El campo esta vacio o no se envio';
            }
        }

        if (Object.keys(vacios).length !== 0) {
            return res.status(400).json({ succes: false, errores: vacios });
        }

        const medico = new Medico({
            nombres,
            apellidos,
            usuario: req.usuario._id,
            hospital,
            img,
        });

        await medico.save();

        res.status(201).json({ succes: true });
    } catch (error) {
        res.status(500).json({ succes: false, error });
    }
};

const updateMedico = async (req, res) => {
    try {
        const { id } = req.params;

        const { nombres, apellidos, hospital } = req.body;

        const medico = await Medico.findById(id, ['-__v']);

        if (!medico) {
            return res.status(404).json({ succes: false, error: `El medico con id: ${id} no existe` });
        }

        medico.nombres = nombres;
        medico.apellidos = apellidos;
        medico.hospital = hospital;
        medico.usuario = req.usuario._id;

        await medico.save();

        res.status(200).json({ succes: true, message: 'Medico actualizado' });
    } catch (error) {
        res.status(500).json({ succes: false, error });
    }
};

const deleteMedico = async (req, res) => {
    try {
        const { id } = req.params;

        const medico = await Medico.findByIdAndRemove(id);

        if (!medico) {
            return res.status(404).json({ succes: false, error: `El medico con id: ${id} no existe` });
        }

        res.status(200).json({ succes: true, message: 'Medico eliminado' });
    } catch (error) {
        res.status(500).json({ succes: false, error });
    }
};

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico,
};
