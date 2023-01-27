import React from "react"

export default function ListNotes(props) {
    // Map over note element with <li> into component
    const noteElements = props.notes.map((note, index) => {
        return <li key={index}>{note}</li>
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