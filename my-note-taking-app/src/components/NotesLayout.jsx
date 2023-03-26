import React from "react";
import { Outlet } from "react-router-dom";
import ListNotes from "../pages/ListNotes";

export default function NotesLayout({ notes, setNotes, loading }) {
    return (
        <div>
            <ListNotes notes={notes} setNotes={setNotes} loading={loading}/>
            <Outlet />
        </div>
    )
}