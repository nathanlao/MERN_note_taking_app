import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ListItem, ListItemText, ListItemIcon, Divider, 
    Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import moment from "moment"
import axios from "axios";

export default function NoteDetails() {
    // Open the modal depends on id on the path
    const [open, setOpen] = useState(false)
    const [noteDetail, setNoteDetail] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        if (id || error) {
            setOpen(true)
        }

        if (open) {
            async function getNoteDetails() {
                setLoading(true)
                try {
                    const response = await axios.get(`http://localhost:3001/api/notes/${id}`)
                    if (response.status !== 200) {
                        // eslint-disable-next-line no-throw-literal
                        throw {
                            message: "Failed to fetch note details", 
                            statusText: response.statusText,
                            status: response.status
                        }
                    }
                    console.log("Fetching note details from db")
                    const data = response.data[0]
                    setNoteDetail(data)
                } catch (err) {
                    setError(err)
                    console.log(err)
                } finally {
                    setLoading(false)
                }
            }
            getNoteDetails()
        }
    }, [id, open])

    function handleClose() {
        setOpen(false)
    }

    let noteBodyEl
    if (noteDetail?.body) {
        noteBodyEl = noteDetail?.body.split("\n").map((line, index) => {
            // Avoid user enter extra "\n"
            if (line === "") {
                return null;
            }
            return (
                <ListItem key={index} style={{ pt: 0, pb: 1.5, pl: 0 }}>
                    <ListItemIcon>
                        <ArrowCircleRightIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary={line} />
                </ListItem>
            )
        })
    }  
    
    if (error) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="dialog-title">
                    <Typography variant="h5" component="div">
                        There was an error: {error.message}
                    </Typography>
                </DialogTitle>
                <DialogActions>
                    <Link to="/" className="dialog-close-btn">
                        <Button onClick={handleClose}>Close</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        )
    }
    
    return (
        <>
            <Dialog open={open} onClose={handleClose} PaperProps={{
                    style: {
                        backgroundColor: `${noteDetail.color}`,
                        color: "#333333",
                        borderRadius: "10px",
                        overflow: "hidden",
                    },
                }}
            >
                <DialogTitle className="dialog-title">
                    <Typography variant="h5" component="div">
                        {noteDetail.title}
                    </Typography>
                    <Typography variant="body2">Last Modified: {moment(noteDetail.timeLastModified).startOf('ss').fromNow() }</Typography>
                </DialogTitle>
                <Divider />
                <DialogContent style={{ width: '500px', height: '300px' }}>
                    {noteBodyEl}
                </DialogContent>
                <DialogActions>
                    <Link to="/" className="dialog-close-btn">
                        <Button onClick={handleClose}>Close</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    )
}