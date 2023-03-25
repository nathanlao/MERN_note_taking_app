import React from "react";
import { Outlet } from "react-router-dom";
import EditNotes from "../pages/EditNotes";

export default function Layout( {setNotes} ) {
    return (
        <div>
            <EditNotes setNotes={setNotes}/>
            <Outlet />
        </div>
    )
}