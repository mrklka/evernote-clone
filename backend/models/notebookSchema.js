const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notebookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unqiue: true,
        trim: true,
        minlength: 3
    },
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true,
});

const Notebook = mongoose.model('Notebook', notebookSchema);

module.exports = Notebook;