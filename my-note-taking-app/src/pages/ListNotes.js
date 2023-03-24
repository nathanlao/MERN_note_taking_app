import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, Typography, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material"
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListNotes({ notes }) {

    // Keep track of modal state and user clicked note state
    const [showModal, setShowModal] = useState(false)
    const [clickedNote, setClickedNote] = useState("")

    function handleViewNote(event, noteId) {

        event.preventDefault()
        // Filter out the with the one note that user click (matched id)
        const clickedNote = notes.filter((note) => note.id === noteId)
        setShowModal(true)
        setClickedNote(clickedNote[0])
    }

    function closeModal() {
        setShowModal(false)
    }

    // Map over note element with <li> into component
    const noteElements = notes.map((note, index) => {
        return  (
            <ListItem key={note._id} secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemIcon>
                    <TextSnippetIcon />
                </ListItemIcon>
                <Link to={`/${note._id}`}>
                    <ListItemText primary={note.title}/>
                </Link>
                {/* <a href={`/notes/${note._id}`} onClick={(event) => handleViewNote(event, note.id)}>
                    {note.title}</a> */}
            </ListItem>
        )
    })

    let noteBodyElements
    if (clickedNote) {
        noteBodyElements = clickedNote.body.split("\n").map((line, index) => {
            // Avoid user enter extra "\n"
            if (line === "") {
                return null;
            }
            return (
                <li key={index}>
                    {line}
                </li>
            )
        })
    }

    return (
        <section className="section-container">
            <Typography sx={{ mt: 4, mb: 4 }} variant="h5" component="div">SAVED NOTES:</Typography> 
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Grid container spacing={2} direction="column">
                        {noteElements}
                    </Grid>
                </Grid>
            </Grid>
            {showModal && 
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-close-btn-container">
                        <i className="modal-close fa-solid fa-circle-xmark" onClick={closeModal}></i>
                    </div>
                    <div className="modal-notes-container">
                        <h1 className="modal-notes-title">{clickedNote.title}</h1>
                        <ul className="modal-notes-body">
                            {noteBodyElements}
                        </ul>
                    </div>
                </div>
            </div>
            }
        </section>
    )
}