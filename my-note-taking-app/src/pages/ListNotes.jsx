import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, List, Typography, ListItem, ListItemText, 
    ListItemIcon, IconButton, Divider, Snackbar, Alert } from "@mui/material"
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import moment from "moment"
import axios from "axios"

export default function ListNotes({ notes, setNotes }) {

    const [openSnackbar, setOpenSnackbar] = useState(false)

    async function handleDeleteNote(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3001/api/notes/${id}`)
                const data = response.data

                setOpenSnackbar(true)

                 // update state of notes after successful delete request
                setNotes(preNotes => preNotes.filter((note) => id !== note.id))
            } catch (err) {
                console.log(err)
            }
        }
    }

    // Map over note element with List into component
    const noteElements = notes.map((note) => {
        return  (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
                <List >
                    <ListItem secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNote(note.id)}>
                                <DeleteForeverOutlinedIcon />
                            </IconButton>
                        }
                        sx={{ py: 0.5 }}
                        className="list-notes"
                    >
                        <ListItemIcon>
                            <EventNoteOutlinedIcon />
                        </ListItemIcon>
                        <Link to={`/${note.id}`} >
                            <ListItemText 
                                sx={{ marginLeft: -2 }}
                                primaryTypographyProps={{ textTransform: "uppercase" }}
                                primary={note.title} 
                                secondary={`Created at: ${moment(note.timeCreated).startOf('ss').fromNow()}`}
                            />
                        </Link>
                    </ListItem>
                    <Divider component="li" />
                </List>
            </Grid>
        )
    })

    return (
        <section className="list-notes-container">
            <Typography sx={{ mt: 0, mb: 2 }} variant="h5" component="div">YOUR NOTES:</Typography> 
            <Grid container spacing={1}>
                {noteElements}
            </Grid>
            <Snackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                autoHideDuration={3000}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    Successfully deleted your note!
                </Alert>
            </Snackbar>
        </section>
    )
}