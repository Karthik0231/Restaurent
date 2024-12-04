import React,{useEffect} from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import axios from 'axios';
import { Edit, Delete } from "@mui/icons-material";


export default function ViewUser() {
  const host = 'http://localhost:7000';
  const [userData, setUserData] = React.useState([]);

  useEffect(() => {
    axios.get(`${host}/user/User`)
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
        })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${host}/user/deleteUser/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("User deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">User Data</Typography>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <IconButton color="secondary" onClick={() => handleDelete(user._id)}>
                      <Delete />
                    </IconButton>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>

    </div>
  )
}
