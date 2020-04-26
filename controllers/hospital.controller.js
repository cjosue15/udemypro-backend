const Hospital = require('../models/Hospital');

const getHospitales = async (req, res) => {
    // let { pagina, filas } = req.query;
    let pagina = Number(req.query.pagina);
    let filas = Number(req.query.filas);

    if (!pagina || isNaN(pagina)) {
        pagina = 1;
    }

    if (!filas || isNaN(filas)) {
        filas = 10;
    }

    const items_desde = (pagina - 1) * filas;

    try {
        const hospitales = await Hospital.find({}).populate('usuario', 'nombres email').skip(items_desde).limit(filas);

        const total_items = await Hospital.countDocuments();

        const total_pages = Math.round(total_items / filas);

        let prev_page;
        let next_page;

        if (pagina >= total_pages) {
            next_page = null;
        } else {
            next_page = pagina + 1;
        }

        if (pagina <= 1 || pagina > total_pages) {
            prev_page = null;
        } else {
            prev_page = pagina - 1;
        }

        const paginacion = {
            items_desde,
            items_hasta: items_desde + hospitales.length,
            total_items,
            total_pages,
            prev_page,
            next_page,
            page_active: pagina,
        };

        res.status(200).json({ succes: true, data: hospitales, paginacion });
    } catch (error) {
        res.status(400).json({ succes: false, error });
    }
};

const createHospital = async (req, res) => {
    try {
        const { nombre, img } = req.body;

        const data = {
            nombre,
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

        const hospital = new Hospital({
            nombre,
            usuario: req.usuario._id,
            img,
        });

        await hospital.save();

        res.status(201).json({ succes: true });
    } catch (error) {
        res.status(500).json({ succes: false, error });
    }
};

const updateHospital = async (req, res) => {
    try {
        const { id } = req.params;

        const { nombre } = req.body;

        let hospital = await Hospital.findById(id, ['-__v']);

        if (!hospital) {
            return res.status(404).json({ succes: false, error: `El hospital con id: ${id} no existe` });
        }

        hospital.nombre = nombre;
        hospital.usuario = req.usuario._id;

        await hospital.save();

        // console.log(req.usuario);

        res.status(200).json({ succes: true, message: 'Hospital actualizado' });
    } catch (error) {
        res.status(500).json({ succes: false, error });
    }
};

const deleteHospital = async (req, res) => {
    try {
        const { id } = req.params;

        const hospital = await Hospital.findByIdAndRemove(id);

        if (!hospital) {
            return res.status(404).json({ succes: false, error: `El hospital con id: ${id} no existe` });
        }

        res.status(200).json({ succes: true, message: 'Hospital eliminado' });
    } catch (error) {
        res.status(500).json({ succes: false, error });
    }
};

module.exports = {
    getHospitales,
    createHospital,
    deleteHospital,
    updateHospital,
};
