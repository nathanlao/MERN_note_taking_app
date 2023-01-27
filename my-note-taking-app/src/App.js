import React, { useState } from "react"
import EditNotes from "./components/EditNotes"
import ListNotes from "./components/ListNotes"

export default function App() {

    // Array of notes state
    const [notes, setNotes] = useState([])

    // console.log(notes)
    
    function handleNotesSubmit(newNote) {
        if (newNote === "") {
            alert("Please type down your notes before saving...")
        } else {
            setNotes(prevNotes => {
                return [...prevNotes, newNote]
            })
        }
    }

    return (
        <main>
            <EditNotes handleNotesSubmit={handleNotesSubmit}/>
            <ListNotes notes={notes} />
        </main>
    )
}