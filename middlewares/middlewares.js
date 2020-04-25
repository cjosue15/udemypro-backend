const jwt = require('jsonwebtoken');

const verificarToken = async (req, res, next) => {
    const auth = req.header('Authorization');

    if (!auth) {
        return res.status(403).send({ message: 'Tu petición no tiene cabecera de autorización' });
    }

    const token = auth.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.SEED);

        req.usuario = decoded.usuario;

        next();
    } catch (error) {
        res.status(401).json({ succes: false, error });
    }
};

const verificaRol = (req, res, next) => {
    const user_role = req.usuario.role;
    if (user_role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            error: {
                message: 'El usuario no cuenta con permisos necesarios',
            },
        });
    }
};

module.exports = {
    verificarToken,
    verificaRol,
};
