const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const medicoSchema = new Schema({
    nombres: { type: String, required: [true, 'Los nombre son necesarios'] },
    apellidos: { type: String, required: [true, 'Los apellidos son necesarios'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'El	id hospital es un campo	obligatorio'] },
});

module.exports = mongoose.model('Medico', medicoSchema);
