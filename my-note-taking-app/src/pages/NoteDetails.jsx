import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ListItem, ListItemText, ListItemIcon, Divider, 
    Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, IconButton } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import moment from "moment"
import axios from "axios";

export default function NoteDetails() {
    // Open the modal depends on id on the path
    const [open, setOpen] = useState(false)
    const [noteDetail, setNoteDetail] = useState([])
    const [error, setError] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        if (id || error) {
            setOpen(true)
        }

        if (open) {
            async function getNoteDetails() {
                try {
                    const response = await axios.get(`/api/notes/${id}`)
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
                        backgroundColor: `${noteDetail?.color}`,
                        color: "#333333",
                        borderRadius: "10px",
                        overflow: "hidden",
                    },
                }}
            >
                <DialogTitle className="dialog-title">
                    <Typography 
                        variant="h5" 
                        component="div"
                        sx={{ textTransform: "uppercase" }}
                    >
                        {noteDetail?.title}
                    </Typography>
                    <Typography variant="body2" className="dialog-edit">
                        Last Modified: {moment(noteDetail?.timeLastModified).startOf('ss').fromNow() }
                        <Link to="/" state={
                            {
                                id: noteDetail?.id,
                                title: noteDetail?.title,
                                body: noteDetail?.body,
                                color: noteDetail?.color,
                                timeCreated: noteDetail?.timeCreated,
                                timeLastModified: noteDetail?.timeLastModified
                            }
                        }>
                            <IconButton>
                                <DriveFileRenameOutlineOutlinedIcon />
                            </IconButton>
                        </Link>
                    </Typography>
                </DialogTitle>
                <Divider />
                <DialogContent style={{ width: '650px', height: '300px' }}>
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