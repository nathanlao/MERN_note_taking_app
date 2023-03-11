import React, { useState, useEffect } from "react"
import EditNotes from "./pages/EditNotes"
import ListNotes from "./pages/ListNotes"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"

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
            <Routes>
                <Route path="/notes" element={<Layout setNotes={setNotes}/>}>
                    <Route index element={<ListNotes notes={notes}/>} />  
                </Route>
            </Routes>
        </main>
    )
}