import React from "react"
import EditNotes from "./components/EditNotes"
import ListNotes from "./components/ListNotes"

export default function App() {
    return (
        <main>
            <EditNotes />
            <ListNotes />
        </main>
    )
}