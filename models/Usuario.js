const mongoose = require('mongoose');

const mongoose_validators = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido',
};

const usuarioSchema = new Schema({
    nombres: { type: String, required: [true, 'El nombre es necesario'] },
    apellidos: { type: String, required: [true, 'Los apellidos son necesarios'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: roles },
});

usuarioSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
};

usuarioSchema.plugin(mongoose_validators, { message: '{PATH} debe ser único' });
// usuarioSchema.plugin(mongoose_validators, { message: 'El correo debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);
