import React, { useState } from "react"
import EditNotes from "./components/EditNotes"
import ListNotes from "./components/ListNotes"

export default function App() {

    const [notes, setNotes] = useState([])

    console.log(notes)
    
    function handleNotesSubmit(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote]
        })
    }

    return (
        <main>
            <EditNotes handleNotesSubmit={handleNotesSubmit}/>
            <ListNotes />
        </main>
    )
}