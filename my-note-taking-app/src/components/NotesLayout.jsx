import React from "react";
import { Outlet } from "react-router-dom";
import ListNotes from "../pages/ListNotes";

export default function NotesLayout( {notes} ) {
    return (
        <div>
            <ListNotes notes={notes}/>
            <Outlet />
        </div>
    )
}