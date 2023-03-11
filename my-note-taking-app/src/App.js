import React, { useState, useEffect } from "react"
import EditNotes from "./components/EditNotes"
import ListNotes from "./components/ListNotes"

export default function App() {
    // localStorage.clear()

    // myNotes from localStorage
    const myNotes = JSON.parse(localStorage.getItem("myNotes"))

    // Array of notes state
    // Lazy state initializtion for notes state
    const [notes, setNotes] = useState(() => myNotes || [])

    // Side effect for localStorage
    useEffect(() => {
        localStorage.setItem("myNotes", JSON.stringify(notes))
    }, [notes])
    
    return (
        <main>
            <EditNotes setNotes={setNotes}/>
            <ListNotes notes={notes}/>
        </main>
    )
}