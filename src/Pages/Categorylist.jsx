import React, { useEffect } from 'react';
import axios from 'axios';
import '../Css/CategoryList.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CategoryCard from './CategoryCard';

export default function Categorylist() {
  const host = 'http://localhost:7000';
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    axios.get(`${host}/api/catview`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []); // Added dependency array

  return (
    <Box className='product-grid'>
      <h2>Our <span>Category</span></h2>
      <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <Card >
              <Box className='product-card' style={{
                width: '230px',
                height: '150px',
                backgroundColor: '#eb9800',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <h2 style={{
                  textDecoration: 'none',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>{category.category}</h2>
              </Box>
             
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}