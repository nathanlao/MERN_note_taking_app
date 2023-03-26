import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { nanoid } from "nanoid"
import { useLocation, useNavigate } from "react-router-dom";

export default function EditNotes({ setNotes }) {

    const location = useLocation()
    const isEditing = location.state !== null
    // Link state: note attributes from note details
    const noteId = location?.state?.id
    const noteTimeCreated = location?.state?.timeCreated
    const noteTitle = location?.state?.title
    const noteBody = location?.state?.body
    const noteColor = location?.state?.color

    // navigate programmatically
    const navigate = useNavigate()

    const colors = [
        { label: "White", value: "#ffffff" },
        { label: "Pale Pink", value: "#f5cac3" },
        { label: "Baby Blue", value: "#ade8f4" },
        { label: "Mustard yellow", value: "#e9c46a" },
        { label: "Pale green", value: "#cbdfbd" },
        { label: "Lavender purple", value: "#9c89b8" },
    ];

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [color, setColor] = useState("")
    const [openWarning, setOpenWarning] = useState(false)
    const [openCreateSnackbar, setOpenCreateSnackbar] = useState(false);
    const [openEditSnackbar, setOpenEditSnackbar] = useState(false);
    const [openCancelSnackbar, setOpenCancelSnackbar] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setTitle(noteTitle)
            setBody(noteBody)
            setColor(noteColor)
        } else {
            setTitle("")
            setBody("")
            setColor("")
        }
    }, [isEditing, noteTitle, noteBody, noteColor])

    function handleCancelEditing() {
        setTitle("")
        setBody("")
        setColor("")
        setOpenCancelSnackbar(true)
        navigate("/", {replace: true})
    }

    function handleSubmit(event) {
        // Prevent the page refresh
        event.preventDefault()
        
        if (!title) {

            setOpenWarning(true)

        } else {

            // POST request to save a new note 
            async function saveNewNote() {
                try {
                    const newNote = {
                        id: nanoid(),
                        title: title,
                        body: body,
                        color: color,
                        timeCreated: Date.now(),
                        timeLastModified: Date.now()
                    }

                    const response = await axios.post("http://localhost:3001/api/notes", newNote)
                    const data = response.data
                    
                    setOpenCreateSnackbar(true)

                    // Update the setNotes state
                    setNotes(prevNotes => {
                        return [...prevNotes, newNote]
                    })

                } catch (err) {
                    console.log(err)
                }
            }

            // PUT request to modify a current note
            async function editCurrentNote() {
                try {
                    const updatedNote = {
                        id: noteId,
                        title: title,
                        body: body,
                        color: color,
                        timeCreated: noteTimeCreated,
                        timeLastModified: Date.now()
                    }
                    const response = await axios.put(`http://localhost:3001/api/notes/${noteId}`, updatedNote)
                    const data = response.data

                    setOpenEditSnackbar(true);

                    // Update setNotes state
                    setNotes(prevNotes => {
                        const updatedNotes = prevNotes.map(note => {
                            if (note.id === noteId) {
                                return updatedNote
                            }
                            return note
                        })
                        return updatedNotes
                    })
                    
                    navigate("/", {replace: true})
                } catch (err) {
                    console.log(err)
                }
            }

            if (isEditing) {
                editCurrentNote()
            } else {
                saveNewNote()
            }
        }

        // Clear the textfield
        setTitle("")
        setBody("")
        setColor("")
    }

    function handleTitleChange(event) {
        const { value } = event.target
        setTitle(value)
    }

    function handleBodyChange(event) {
        const { value } = event.target
        setBody(value)
    }

    function handleColorChange(event) {
        const { value } = event.target
        setColor(value)
    }

    const selectColorEl = colors.map((color) => (
        <MenuItem key={color.value} value={color.value} style={{ backgroundColor: color.value }}>
            {color.label}
        </MenuItem>
    ))

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <TextField 
                    style={{backgroundColor: "white", borderRadius: '6px 6px 0px 0px'}}
                    label={isEditing ? "Editing Title" : "Title"}
                    variant="filled"
                    // Controlled component (controlled by react state)
                    value={title}
                    onChange={handleTitleChange}
                />
                <TextField
                    style={{backgroundColor: "white"}}
                    label={isEditing ? "Editing Body" : "Body"}
                    variant="filled"
                    multiline
                    rows={5}
                    value={body}
                    onChange={handleBodyChange}
                />
                <TextField 
                    select
                    variant="filled"
                    style={{backgroundColor: "white"}}
                    label={isEditing ? "Editing Color" : "Color"}
                    value={color}
                    onChange={handleColorChange}
                >
                    {selectColorEl}
                </TextField>
                {isEditing ? (
                    <Button 
                        style={{borderRadius: '0px'}}
                        className="form-cancel-btn"
                        color="error"
                        variant="contained"
                        onClick={handleCancelEditing}
                    >
                        Cancel Editing
                    </Button>
                ) : null}
                <Button 
                    className="form-save-note" 
                    type="submit" 
                    variant="contained"
                >
                    {isEditing ? "SAVE EDITED NOTE" : "CREATE NEW NOTE"}
                </Button>
            </form>
            <Snackbar
                open={openWarning}
                autoHideDuration={6000}
                onClose={() => setOpenWarning(false)}
            >
                <Alert onClose={() => setOpenWarning(false)} severity="warning" sx={{ width: '100%' }}>
                    Please enter your notes before saving!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openCreateSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenCreateSnackbar(false)}
            >
                <Alert onClose={() => setOpenCreateSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    Successfully created your note!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openEditSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenEditSnackbar(false)}
            >
                <Alert onClose={() => setOpenEditSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    Successfully edited your note!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openCancelSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenCancelSnackbar(false)}
            >
                <Alert onClose={() => setOpenCancelSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    Successfully cancelled!
                </Alert>
            </Snackbar>
        </>
    )
}