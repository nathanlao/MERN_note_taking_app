import React, { useState } from "react";
import swal from "sweetalert"
import { nanoid } from "nanoid"

export default function EditNotes({ setNotes }) {

    const [note, setNote] = useState("")

    function handleSubmit(event) {
        // Prevent the page refresh
        event.preventDefault()
        
        if (note.trim().length === 0) {
            swal({
                title: "Warning",
                text: "Please type down your notes before saving...",
                icon: "warning",
                button: "OK"
            });
        } else {

            // split the newNote with title and body
            const newLineIndex = note.indexOf("\n")
            let title = ""
            let body = ""

            // if no newline found
            if(newLineIndex === -1) {
                title = note
                body = ""
            } else {
                title = note.slice(0, newLineIndex)
                body = note.slice(newLineIndex + 1)
            }

            // Give the newNote a nanoid
            const newNoteObject = {
                id: nanoid(),
                title: title,
                body: body
            }
            setNotes(prevNotes => {
                return [...prevNotes, newNoteObject]
            })
        }

        // Clear the textarea
        setNote("")
    }
    
    function handleChange(event) {
        const { value } = event.target
        setNote(value)
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <textarea 
                className="form-textarea"
                placeholder="Title your note here and separate content with new line for clear organization..."
                onChange={handleChange}
                // Controlled component (controlled by react state)
                value={note}
                name={note}
                />
            <button className="form-save-note">SAVE NOTE</button>
        </form>
    )
}