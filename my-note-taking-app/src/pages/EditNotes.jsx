import React, { useState } from "react";
import swal from "sweetalert"
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { nanoid } from "nanoid"

export default function EditNotes({ setNotes }) {

    const colors = [
        { label: "White", value: "white" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
        { label: "Yellow", value: "yellow" },
    ];

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [color, setColor] = useState("")

    function handleSubmit(event) {
        // Prevent the page refresh
        event.preventDefault()

        console.log(title, body, color)
        
        // if (note.trim().length === 0) {
        //     swal({
        //         title: "Warning",
        //         text: "Please type down your notes before saving...",
        //         icon: "warning",
        //         button: "OK"
        //     });
        // } else {

        //     // split the newNote with title and body
        //     const newLineIndex = note.indexOf("\n")
        //     let title = ""
        //     let body = ""

        //     // if no newline found
        //     if(newLineIndex === -1) {
        //         title = note
        //         body = ""
        //     } else {
        //         title = note.slice(0, newLineIndex)
        //         body = note.slice(newLineIndex + 1)
        //     }

        //     // Give the newNote a nanoid
        //     const newNoteObject = {
        //         id: nanoid(),
        //         title: title,
        //         body: body
        //     }
        //     setNotes(prevNotes => {
        //         return [...prevNotes, newNoteObject]
        //     })
        // }

        // // Clear the textarea
        // setNote("")
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
        <MenuItem key={color.value} value={color.value}>
            {color.label}
        </MenuItem>
    ))

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <TextField 
                style={{backgroundColor: "white", borderRadius: '6px 6px 0px 0px'}}
                label="Title"
                variant="filled"
                // Controlled component (controlled by react state)
                value={title}
                onChange={handleTitleChange}
            />
            <TextField
                style={{backgroundColor: "white"}}
                label="Body"
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
                label="Color"
                value={color}
                onChange={handleColorChange}
            >
                {selectColorEl}
            </TextField>
            <Button 
                className="form-save-note" 
                type="submit" 
                variant="contained"
            >
                SAVE NOTE
            </Button>
        </form>
    )
}