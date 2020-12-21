const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trashSchema = new Schema({
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

const Trash = mongoose.model('Trash', trashSchema);

module.exports = Trash;