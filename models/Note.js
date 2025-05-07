const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true, trim: true },
    catfact: { type: String, required: true, trim: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
