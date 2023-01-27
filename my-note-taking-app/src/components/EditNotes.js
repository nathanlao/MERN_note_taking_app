import React, { useState } from "react";

export default function EditNotes() {

    const [note, setNote] = useState("")

    function handleSubmit(event) {
        // Prevent the page refresh
        event.preventDefault()
        
        console.log(note)

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