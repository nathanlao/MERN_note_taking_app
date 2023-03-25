import React from "react";
import { Outlet } from "react-router-dom";
import ListNotes from "../pages/ListNotes";

export default function NotesLayout( {notes, setNotes} ) {
    return (
        <div>
            <ListNotes notes={notes} setNotes={setNotes} />
            <Outlet />
        </div>
    )
}