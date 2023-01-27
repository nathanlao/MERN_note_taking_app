import React, { useState } from "react"
import EditNotes from "./components/EditNotes"
import ListNotes from "./components/ListNotes"
import swal from "sweetalert"

export default function App() {

    // Array of notes state
    const [notes, setNotes] = useState([])

    // console.log(notes)
    
    function handleNotesSubmit(newNote) {
        if (newNote === "") {
            swal({
                title: "Warning",
                text: "Please type down your notes before saving...",
                icon: "warning",
                button: "OK"
              });
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