/**
 *  Using express.Router() to organize routes
 */

const express = require('express')
const router = express.Router()
// Mongoose model: Notes
const Note = require('../NotesModel')

// GET all notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find()
        console.log('Notes fetched from db!')
        res.status(200).json(notes)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

// GET a note by id
router.get('/notes/:id', async (req, res) => {
    const id = req.params.id

    try {
        const note = await Note.find({ id: id })
        if (note === null) {
            res.status(404).send("Note not found!")
        } else {
            console.log('Note fetched from db!')
            res.status(200).json(note)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

// POST a new note
router.post('/notes', async (req, res) => {
    try {
        const { id, title, body, color } = req.body
        const newNoteObj  = new Note({
            id: id,
            title: title,
            body: body,
            color: color
        }) 
        
        if (!title || !body) {
            throw {
                message: "Title or body required"
            }
        }

        const newNote = await newNoteObj.save()
        console.log('New note saved to db!')
        res.status(200).json(newNote)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

// PUT (update) a note by id
router.put('/notes/:id', async (req, res) => {
    const id = req.params.id
    const { title, body, color } = req.body

    try {
        const note = await Note.findById(id)
        if (note === null) {
            res.status(404).send("Note not found!")
        } else {
            const updatedNote = await Note.updateOne(
                { _id: id },
                { $set: {
                    "title": title, 
                    "body": body, 
                    "color": color,
                    "timeLastModified": Date.now()
                    }
                }, 
                {upsert: true}
            )
            console.log('Note updated in db!')
            res.status(200).json(updatedNote)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

// DELETE a note by id
router.delete('/notes/:id', async (req, res) => {
    const id = req.params.id
    try {
        const note = await Note.findById(id)
        if (note === null) {
            res.status(404).send("Note not found!")
        } else {
            const deletedNote = await Note.deleteOne({ _id: id })
            console.log('Note deleted from db!')
            res.json(deletedNote)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

module.exports = router