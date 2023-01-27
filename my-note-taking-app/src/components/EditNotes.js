import React from "react";

export default function EditNotes() {
    return (
        <form className="form-container">
            <textarea 
                className="form-textarea"
                placeholder="Type your note's title here..."
                />
            <button className="form-save-note">SAVE NOTE</button>
        </form>
    )
}