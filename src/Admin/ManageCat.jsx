import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ManageCat() {
  const host = 'http://localhost:7000';
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: '', category: '' });
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${host}/api/catview`);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
      setError('Failed to fetch categories');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${host}/api/catdelete/${id}`);
      alert('Deleted Successfully');
      fetchCategories(); // Refresh categories after deletion
    } catch (err) {
      console.log(err);
      setError('Failed to delete category');
      setOpenSnackbar(true);
    }
  };

  const handleOpenDialog = (category) => {
    setCurrentCategory({ id: category._id, category: category.category });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({ id: '', category: '' }); // Reset state
  };

  const handleUpdate = async () => {
    try {
      // Ensure the ID and category are set correctly
      if (!currentCategory.id || !currentCategory.category) {
        setError('Please provide valid category details');
        setOpenSnackbar(true);
        return;
      }

      // Debugging: Log the category being updated
      console.log('Updating category:', currentCategory);

      const res = await axios.put(`${host}/api/catupdate/${currentCategory.id}`, { category: currentCategory.category });
      console.log("Update response:", res.data);

      alert('Category updated successfully');
      fetchCategories(); // Refresh categories after updating
      handleCloseDialog();
    } catch (err) {
      console.error("Error updating category", err);
      setError('Failed to update category');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Box sx={{ padding: 4 }}>
        <Link to='/Addcart'>
          <Button variant="contained" sx={{ marginBottom: 2 }}>
            Add Category
          </Button>
        </Link>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl/No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((row, i) => (
                <TableRow key={row._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenDialog(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteCategory(row._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Title"
            type="text"
            fullWidth
            variant="outlined"
            value={currentCategory.category}
            onChange={(e) => setCurrentCategory(prev => ({ ...prev, category: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={error}
        autoHideDuration={6000}
      />
    </div>
  );
}
