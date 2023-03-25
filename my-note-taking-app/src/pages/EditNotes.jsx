import React, { useState } from "react";
import swal from "sweetalert"
import { TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { nanoid } from "nanoid"

export default function EditNotes({ setNotes }) {

    const colors = [
        { label: "White", value: "#ffffff" },
        { label: "Pale Pink", value: "#f5cac3" },
        { label: "Baby Blue", value: "#ade8f4" },
        { label: "Mustard yellow", value: "#e9c46a" },
        { label: "Pale green", value: "#cbdfbd" },
        { label: "Lavender blue", value: "#9c89b8" },
    ];

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [color, setColor] = useState("")

    function handleSubmit(event) {
        // Prevent the page refresh
        event.preventDefault()
        
        if (!title) {
            swal({
                title: "Warning",
                text: "Please type down your notes before saving...",
                icon: "warning",
                button: "OK"
            });
        } else {

            async function saveNewNote() {
                try {
                    const newNote = {
                        id: nanoid(),
                        title: title,
                        body: body,
                        color: color
                    }

                    const response = await axios.post("http://localhost:3001/api/notes", newNote)
                    const data = response.data

                    setNotes(prevNotes => {
                        return [...prevNotes, newNote]
                    })

                } catch (err) {
                    console.log(err)
                }
            }
            saveNewNote()
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