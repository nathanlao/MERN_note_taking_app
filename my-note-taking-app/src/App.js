import React, { useState } from "react"
import EditNotes from "./components/EditNotes"
import ListNotes from "./components/ListNotes"
import swal from "sweetalert"
import { nanoid } from "nanoid"

export default function App() {

    // Array of notes state
    const [notes, setNotes] = useState([])

    // console.log(notes)
    
    function handleNotesSubmit(newNote) {
        if (newNote.trim().length === 0) {
            swal({
                title: "Warning",
                text: "Please type down your notes before saving...",
                icon: "warning",
                button: "OK"
              });
        } else {

            // split the newNote with title and body
            const newLineIndex = newNote.indexOf("\n")
            let title = ""
            let body = ""

            // if no newline found
            if(newLineIndex === -1) {
                title = newNote
                body = ""
            } else {
                title = newNote.slice(0, newLineIndex)
                body = newNote.slice(newLineIndex + 1)
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
    }

    return (
        <main>
            <EditNotes handleNotesSubmit={handleNotesSubmit}/>
            <ListNotes notes={notes}/>
        </main>
    )
}