import React,{useState,useEffect} from 'react'
import Box  from '@mui/material/Box'
import Grid  from '@mui/material/Grid'
import {FormControl,InputLabel,MenuItem} from '@mui/material'
import '../Css/RecipeCard.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import SingleRec from './SingleRec';
import { Select } from '@mui/material';


export default function Recipeslist() {
  const host = 'http://localhost:7000';
  const [dishes, setDishes] =useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    axios.get(`${host}/api/viewDish`)
      .then((res) => {
        console.log(res.data);
        setDishes(res.data);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []); 

  useEffect(() => {
    axios.get(`${host}/api/catview`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleSearch=(event)=>{
    setSearchQuery(event.target.value);
  }

  const filterDishes=dishes.filter((product)=>{
    return(
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || product.mealType=== selectedCategory)
    )
  })
  return (
    <Box className='product-grid'>
        <h2>Our<span>Products</span></h2>
        <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} style={{height:"40px",width:"700px"}}/>&nbsp; 
        <FormControl variant="outlined" sx={{minwidth: 200}}>
          <InputLabel>Category</InputLabel>
          <Select  value={selectedCategory} onChange={handleCategoryChange} label="Category">
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.category}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid className='grid'>
          {filterDishes.map((dish) => (
                    <Grid item xs={12} sm={6} md={4} key={dish._id}>
                      <Link to={`/singleView/${dish._id}`}>
        <Box className='product-card'>
        <img src={`${host}/upload/${dish?.image}`}
        alt=""/>
        <h3 style={{textDecoration:'none'}}>{dish.name}</h3>
       <b> <p>{dish.price}</p></b>
      </Box></Link>
      </Grid>    
                ))}
    </Grid>
    </Box>
  )
}
