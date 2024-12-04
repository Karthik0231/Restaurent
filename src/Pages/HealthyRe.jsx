import React,{useEffect} from 'react'
import Box from '@mui/material/Box'
import image from '../Assets/F2.png'
import Recipeslist from './Recipeslist'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function HealthyRe() {
  const navigate=useNavigate()

  useEffect(() => {
    if(localStorage.getItem('userToken')===null){
      navigate('/login')
    }
  },[navigate])

  return (
    <div>

      <Box component='section' sx={{p:0,border:"1px solid grey",display:'flex'}}>
        <img src={image} height='300px' width='1550px' alt=''/>
      </Box>
      <Recipeslist/>
    </div>
  )
}
