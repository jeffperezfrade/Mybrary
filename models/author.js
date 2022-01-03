const mongoose = require('mongoose');

// Modelo de datos
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Author', authorSchema);