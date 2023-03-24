import React from "react";
import { useParams } from "react-router-dom";

export default function NoteDetails() {
    const { id } = useParams()
    
    return (
        <h1>
            Notes modal will be here with id: {id}
        </h1>
    )
}