import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, List, Typography, ListItem, ListItemText, ListItemIcon, IconButton, Divider } from "@mui/material"
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import moment from "moment"

export default function ListNotes({ notes }) {

    // Map over note element with List into component
    const noteElements = notes.map((note) => {
        return  (
            <List key={note._id} >
                <ListItem secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <DeleteForeverOutlinedIcon />
                        </IconButton>
                    }
                    sx={{ py: 0.5 }}
                    className="list-notes"
                >
                    <ListItemIcon>
                        <EventNoteOutlinedIcon />
                    </ListItemIcon>
                    <Link to={`/${note._id}`} >
                        <ListItemText 
                            primary={note.title} sx={{ marginLeft: -2 }}
                            secondary={`Created at: ${moment(note.timeCreated).startOf('ss').fromNow()}`}
                        />
                    </Link>
                </ListItem>
                <Divider component="li" />
            </List>
        )
    })

    return (
        <section className="list-notes-container">
            <Typography sx={{ mt: 0, mb: 2 }} variant="h5" component="div">SAVED NOTES:</Typography> 
            {noteElements}
        </section>
    )
}