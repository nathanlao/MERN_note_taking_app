import React from "react"

export default function ListNotes(props) {

    console.log(props.notes)

    // Map over note element with <li> into component
    const noteElements = props.notes.map((note, index) => {
        // split the note with \n and display the note's title onlt
        return  (
            <li key={note.id}>
                <a href="/#" onClick={() => props.handleViewNote(note.id)}>
                    {note.body.split("\n")[0]}</a>
            </li>
        )
    })

    return (
        <section className="section-container">
            <h1 className="section-heading">SAVED NOTES:</h1> 
            <ul className="section-list-notes">
                {noteElements}
            </ul>
        </section>
    )
}