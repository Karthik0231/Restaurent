import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import Foot from '../Component/Foot';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddRec() {
  const host='http://localhost:7000'
  const nav=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    extrafood: '',
    mealType: '',
    dietaryType: '',
    prepTime: '',
    cookTime: '',
    TotalCarbohydrates:'',
    calories: '',
    totalCarbs: '',
    protein: '',
    totalFat: '',
    description: '',
    price: '',
    status: '',
    date: ''
  });
  const [image,setImage]=useState('')
  const [cat, setCat]=useState([])

  const dietaryTypes=[
    'Vegan',
    'Vegetarian',
    'Pescetarian',
    'Paleo',
    'Ketogenic',
    'Gluten Free',
    'Lacto Ovo Vegetarian',
    'Primal',
    'Whole 30',
    'None',
    'Other',
  ]

  console.log(formData,"kkjjkj")

  useEffect(()=>{
    axios.get(`${host}/api/catview`)
    .then((res)=>{
      console.log(res.data)
      setCat(res.data)
    })
  
  .catch((err)=>{
    console.log(err)
  })
},[])

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleImage=(e)=>{
    setImage({...image,[e.target.name]:e.target.files[0]})
  }

  console.log(image,"image")
  const handleSubmit=(e)=>{
    e.preventDefault()
    const Data=new FormData()
    Data.append('name',formData.name)
    Data.append('extrafood',formData.extrafood)
    Data.append('mealType',formData.mealType)
    Data.append('dietarytype',formData.dietarytype)
    Data.append('preptime',formData.preptime)
    Data.append('cookTime',formData.cookTime)
    Data.append('calories',formData.calories)
    Data.append('TotalCarbohydrates',formData.TotalCarbohydrates)
    Data.append('protein',formData.protein)
    Data.append('totalFat',formData.totalFat)
    Data.append('description',formData.description)
    Data.append('price',formData.price)
    Data.append('status',formData.status)
    Data.append('date',formData.date)
    Data.append('image',image.image)

    axios
    .post(`${host}/api/insertDish`,Data)
    .then((res)=>{
      if(res.data){
        alert("Data Inserted Successfully")
        console.log("Data Inserted Successfully")
        nav("/ManageRec")
      }
    })
    .catch((err)=>{
    console.error("Error in data",err)
});
};


  
  return (
    <>
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Recipe Management Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid item xs={12}>
              <Link to='/ViewDish'><Button variant="contained" color="primary" fullWidth>
                View Dishes
              </Button></Link>
              </Grid><br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label=""
                name="image"
                type="file"
                fullWidth
                onChange={handleImage}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Extra Food"
                name="extrafood"
                fullWidth
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
  <FormControl fullWidth required sx={{ mb: 2 }}>
    <InputLabel>Meal Type</InputLabel>
    <Select
      name="mealType"
      onChange={handleChange}
      value={formData.mealType || ""}
      required
    >
      {cat.map((category) => (
        <MenuItem key={category.category} value={category.category}>
          {category.category}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

<Grid item xs={12} sm={6}>
  <FormControl fullWidth required sx={{ mb: 2 }}>
    <InputLabel>Dietary Type</InputLabel>
    <Select
      name="dietarytype"
      onChange={handleChange}
      value={formData.dietarytype || ""}
      required
    >
      {dietaryTypes.map((typ) => (
        <MenuItem key={typ} value={typ}>
          {typ}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                label="Prep Time (minutes)"
                name="preptime"
                type="number"
                fullWidth
                required
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Cook Time (minutes)"
                name="cookTime"
                type="number"
                fullWidth
                required
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Calories"
                name="calories"
                type="number"
                fullWidth
                required
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Carbohydrates (g)"
                name="TotalCarbohydrates"
                type="number"
                fullWidth
                required
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Protein (g)"
                name="protein"
                type="number"
                fullWidth
                required
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Fat (g)"
                name="totalFat"
                type="number"
                fullWidth
                required
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                fullWidth
                required
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Price ($)"
                name="price"
                type="number"
                fullWidth
                required
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="unavailable">Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Date"
                name="date"
                type="date"
                fullWidth
                required
                value={formData.date}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
    <Foot/>
    </>
  );
}
