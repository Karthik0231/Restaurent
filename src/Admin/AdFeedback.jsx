import React,{ useState,useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead,IconButton, TableRow, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import {Delete} from '@mui/icons-material'

export default function AdFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
    const [newFeedback, setNewFeedback] = useState('');

    const host = 'http://localhost:7000';
    useEffect(() => {
        axios.get(`${host}/feedback/getFeedback`)
            .then((res) => {
                console.log(res.data);
                setFeedbackList(res.data);
            })
            .catch((err) => {
                console.error('Error fetching feedback:', err);
            });
    })

    const handleDelete = (id) => {
        axios.delete(`${host}/feedback/deleteFeed/${id}`)
          .then((res) => {
            console.log(res.data);
            alert("Feedback deleted successfully");
          })
          .catch((err) => {
            console.log(err);
          })
      }
  return (
    <div>
            <Typography variant="h4">User Feedback Management Page</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Feedback ID</TableCell>
                            <TableCell>Feedback Content</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feedbackList.map((feedback, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{feedback.feedback}</TableCell>
                                <TableCell>{feedback.rating}</TableCell>
                                <IconButton color="secondary" onClick={() => handleDelete(feedback._id)} >
                      <Delete />
                    </IconButton>                 
                               </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

    </div>

  )
}
