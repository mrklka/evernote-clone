const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    notebook: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;