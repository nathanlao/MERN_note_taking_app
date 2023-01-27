import React, { useState } from "react";

export default function EditNotes(props) {

    const [note, setNote] = useState("")

    function handleSubmit(event) {
        // Prevent the page refresh
        event.preventDefault()
        
        props.handleNotesSubmit(note)

        // Clear the textarea
        setNote("")
    }
    
    function handleChange(event) {
        setNote(event.target.value)
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <textarea 
                className="form-textarea"
                placeholder="Type your note's title here..."
                onChange={handleChange}
                // Controlled component
                value={note}
                />
            <button className="form-save-note">SAVE NOTE</button>
        </form>
    )
}