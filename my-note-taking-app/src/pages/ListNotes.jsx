import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, Typography, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material"
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function ListNotes({ notes }) {

    // Map over note element with <li> into component
    const noteElements = notes.map((note, index) => {
        return  (
            <ListItem key={note._id} secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteForeverOutlinedIcon />
                    </IconButton>
                }
                sx={{ py: 0.5 }}
            >
                <ListItemIcon>
                    <EventNoteOutlinedIcon />
                </ListItemIcon>
                <Link to={`/${note._id}`} >
                    <ListItemText primary={note.title} sx={{ marginLeft: -2 }}/>
                </Link>
            </ListItem>
        )
    })

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
        </section>
    )
}