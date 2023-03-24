// Create a Note scehma and model
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    timeLastModified: {
        type: Date,
        default: Date.now
    },
    timeCreated: {
        type: Date,
        default: Date.now
    },
    color: {
        type: String,
        default: "white"
    },
})

module.exports = mongoose.model('Notes', NoteSchema)