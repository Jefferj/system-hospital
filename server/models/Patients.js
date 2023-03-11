const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PatientsSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    createAt: {
        type: Date
    },
    updateAt: {
        type: Date
    },
})

module.exports = mongoose.model('Patients', PatientsSchema);