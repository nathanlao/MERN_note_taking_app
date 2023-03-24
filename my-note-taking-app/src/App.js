import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import NotesLayout from "./components/NotesLayout"
import NoteDetails from "./pages/NoteDetails"
import axios from "axios"

export default function App() {

    /**
     * myNotes from localStorage
     * 
     * const myNotes = JSON.parse(localStorage.getItem("myNotes"))
     * 
     * // Array of notes state
     * const [notes, setNotes] = useState(() => myNotes || [])
     * 
     * // Side effect for localStorage
     * useEffect(() => {
     *   localStorage.setItem("myNotes", JSON.stringify(notes))
     * }, [notes]
     * 
     */

    const [notes, setNotes] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getAllNotes() {
            try {
                const response = await axios.get("http://localhost:3001/api/notes")
                if (response.status !== 200) {
                    // eslint-disable-next-line no-throw-literal
                    throw {
                        message: "Failed to fetch notes", 
                        statusText: response.statusText,
                        status: response.status
                    }
                }
                console.log("Fetching notes from db")
                const data = response.data
                setNotes(data)
            } catch (err) {
                setError(err)
                console.log(err)
            }
        }
        getAllNotes()
    }, [])

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
    return (
        <main>
            <Routes>
                <Route path="/" element={<Layout setNotes={setNotes}/>}>
                    <Route path="/" element={<NotesLayout notes={notes}/>} > 
                        <Route path=":id" element={<NoteDetails />} />  
                    </Route>
                </Route>
            </Routes>
        </main>
    )
}