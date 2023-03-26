// Create a Note scehma and model
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const NoteSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
    },
    timeLastModified: {
        type: Date,
        default: Date.now()
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    color: {
        type: String,
        default: "#ffffff"
    },
})

module.exports = mongoose.model('Notes', NoteSchema)