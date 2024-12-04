import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ManageRecipe() {
  const host = 'http://localhost:7000';
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDish, setSelectedDish] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const res = await axios.get(`${host}/api/viewDish`);
      setDishes(res.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching dishes");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${host}/api/deleteDish/${id}`);
      alert("Dish Deleted Successfully");
      fetchDishes(); // Refresh the list after deletion
    } catch (err) {
      setError("Error deleting dish");
    }
  };

  const handleOpenDialog = (dish) => {
    setSelectedDish(dish);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDish(null);
  };

  const handleUpdate = async () => {
    try {
      // Send the dish ID along with the update data
      await axios.put(`${host}/api/updateDish/${selectedDish._id}`, selectedDish);
      alert("Dish Updated Successfully");
      fetchDishes(); // Refresh the list after update
      handleCloseDialog();
    } catch (err) {
      setError("Error updating dish");
    }
  };

  const handleChange = (e) => {
    setSelectedDish({ ...selectedDish, [e.target.name]: e.target.value });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Manage Dishes</Typography>
        </Grid>

        <Grid item xs={12}>
          <Link to='/AddRec'>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Add Dish
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dish Image</TableCell>
                  <TableCell>Dish Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Extra Food</TableCell>
                  <TableCell>Meal Type</TableCell>
                  <TableCell>Dietary Type</TableCell>
                  <TableCell>Prep Time</TableCell>
                  <TableCell>Cook Time</TableCell>
                  <TableCell>Calories</TableCell>
                  <TableCell>Total Carbohydrates</TableCell>
                  <TableCell>Protein</TableCell>
                  <TableCell>Total Fat</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dishes.map((dish) => (
                  <TableRow key={dish._id}>
                    <TableCell>
                      <img src={`${host}/upload/${dish?.image}`} 
                      style={{ width: 50, height: 50 }}  />
                    </TableCell>
                    <TableCell>{dish.name}</TableCell>
                    <TableCell>{dish.price}</TableCell>
                    <TableCell>{dish.extrafood}</TableCell>
                    <TableCell>{dish.mealType}</TableCell>
                    <TableCell>{dish.dietarytype}</TableCell>
                    <TableCell>{dish.preptime}</TableCell>
                    <TableCell>{dish.cookTime}</TableCell>
                    <TableCell>{dish.calories}</TableCell>
                    <TableCell>{dish.TotalCarbohydrates}</TableCell>
                    <TableCell>{dish.protein}</TableCell>
                    <TableCell>{dish.totalFat}</TableCell>
                    <TableCell>{dish.description}</TableCell>
                    <TableCell>{dish.status}</TableCell>
                    <TableCell>{dish.date}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenDialog(dish)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(dish._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Dish</DialogTitle>
        <DialogContent>
          {selectedDish && (
            <>
              <TextField
                margin="dense"
                name="name"
                label="Dish Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedDish.name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedDish.price}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="image"
                label="Dish Image URL"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedDish.image}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="extrafood"
                label="Extra Food"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedDish.extrafood}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="mealType"
                label="Meal Type"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedDish.mealType}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="dietarytype"
                label="Dietary Type"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedDish.dietarytype}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="preptime"
                label="Prep Time"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedDish.preptime}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="cookTime"
                label="Cook Time"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedDish.cookTime}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="calories"
                label="Calories"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedDish.calories}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="TotalCarbohydrates"
                label="Total Carbohydrates"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedDish.TotalCarbohydrates}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="protein"
                label="Protein"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedDish.protein}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="totalFat"
                label="Total Fat"
                type="number"
                fullWidth
                variant="outlined"
                value={selectedDish.totalFat}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedDish.description}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="status"
                label="Status"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedDish.status}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
