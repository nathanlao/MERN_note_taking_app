import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";

export default function NoteDetails() {
    // Open the modal depends on id on the path
    const [open, setOpen] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            setOpen(true)
        }
    }, [id])

    function handleClose() {
        setOpen(false)
    }

    return (
        <>
            {/* <h1>
                Notes modal will be here with id: {id}
            </h1> */}
            <Dialog open={open}>
                <DialogTitle>Set backup account</DialogTitle>
                <DialogContent>
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}