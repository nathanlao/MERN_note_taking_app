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
            const newNoteObject = {
                id: nanoid(),
                body: newNote
            }
            setNotes(prevNotes => {
                return [...prevNotes, newNoteObject]
            })
        }
    }

    function handleViewNote(noteId) {
        // Filter out the with the one note that user click (matched id)
        const clickedNote = notes.filter((note) => note.id === noteId)
        console.log(clickedNote[0].body)
    }

    return (
        <main>
            <EditNotes handleNotesSubmit={handleNotesSubmit}/>
            <ListNotes notes={notes} handleViewNote={handleViewNote}/>
        </main>
    )
}