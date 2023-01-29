import React, { useState } from "react"

export default function ListNotes(props) {

    // Keep track of modal state and user clicked note state
    const [showModal, setShowModal] = useState(false)
    const [clickedNote, setClickedNote] = useState("")

    function handleViewNote(event, noteId) {

        event.preventDefault()
        // Filter out the with the one note that user click (matched id)
        const clickedNote = props.notes.filter((note) => note.id === noteId)
        setShowModal(true)
        setClickedNote(clickedNote[0])
    }

    function closeModal() {
        setShowModal(false)
    }

    // Map over note element with <li> into component
    const noteElements = props.notes.map((note, index) => {

        return  (
            <li key={note.id}>
                <a href={`/notes/${note.id}`} onClick={(event) => handleViewNote(event, note.id)}>
                    {note.title}</a>
            </li>
        )
    })

    let noteBodyElements
    if (clickedNote) {
        noteBodyElements = clickedNote.body.split("\n").map((line, index) => {
            // Avoid user enter extra "\n"
            if (line === "") {
                return null;
            }
            return (
                <li key={index}>
                    {line}
                </li>
            )
        })
    }

    return (
        <section className="section-container">
            <h1 className="section-heading">SAVED NOTES:</h1> 
            <ul className="section-list-notes">
                {noteElements}
            </ul>
            {showModal && 
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-close-btn-container">
                        <i className="modal-close fa-solid fa-circle-xmark" onClick={closeModal}></i>
                    </div>
                    <div className="modal-notes-container">
                        <h1 className="modal-notes-title">{clickedNote.title}</h1>
                        <ul className="modal-notes-body">
                            {noteBodyElements}
                        </ul>
                    </div>
                </div>
            </div>
            }
        </section>
    )
}