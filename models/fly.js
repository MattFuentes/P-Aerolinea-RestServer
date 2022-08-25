const { Schema, model } = require('mongoose');
const FlySchema = Schema({
    from: {
        type: String,
        required: [true, 'El ORIGEN es obligatorio']
    },
    to: {
        type: String,
        required: [true, 'El DESTINO es obligatorio'],
    },
    duration: {
        type: String,
        required: [true, 'La DURACION es obligatorio'],
    },
    passengers: {
        type: String,
        required: [true, 'Los PASAJEROS son obligatorios'],
    },
    status: {
        type: Boolean,
        default: true
    },
});

FlySchema.methods.toJSON = function() {
    const { __v, ...flys } = this.toObject()
    return flys;
}


module.exports = model( 'Flys', FlySchema);