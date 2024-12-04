import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Foot from '../Component/Foot'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Admin() {
  const host = 'http://localhost:7000';
  const [count,setCount]=useState([])

  useEffect(()=>{
    axios.get(`${host}/overall/count`)
    .then((res)=>{
      setCount(res.data)
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
      })
  })

  return (

    <>
    <div>
<h1 style={{textAlign:'center'}}>Admin dashboard</h1> 
<div style={{display:'flex',gap:'100px',flexWrap:'wrap'}}>
<Link to='/ManageCat' style={{textDecorationLine:'none'}}><Box className='product-card' style={{width:'230px',height:'150px',backgroundColor:'#eb9800',display:'flex',
    flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2 style={{textDecoration:'none',textAlign:'center',fontWeight:'bold',color:'white'}}>Manage Category</h2>
  </Box> </Link>

  <Link to='/ManageRec' style={{textDecorationLine:'none'}}><Box className='product-card' style={{width:'230px',height:'150px',backgroundColor:'#eb9800',display:'flex',
    flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2 style={{textDecoration:'none',textAlign:'center',fontWeight:'bold',color:'white'}}>{count.Dishes}<br/>Manage Recipes</h2>
  </Box></Link>

  <Link to='/ViewUser' style={{textDecorationLine:'none'}}><Box className='product-card' style={{width:'230px',height:'150px',backgroundColor:'#eb9800',display:'flex',
    flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2 style={{textDecoration:'none',textAlign:'center',fontWeight:'bold',color:'white'}}>{count.User}<br/>View User</h2>
  </Box></Link>

  <Link to='/ManageRequest' style={{textDecorationLine:'none'}}><Box className='product-card' style={{width:'230px',height:'150px',backgroundColor:'#eb9800',display:'flex',
    flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2 style={{textDecoration:'none',textAlign:'center',fontWeight:'bold',color:'white'}}>{count.Orders}<br/>Manage Request</h2>
  </Box></Link>

  <Link to='/ManagePayment' style={{textDecorationLine:'none'}}><Box className='product-card' style={{width:'230px',height:'150px',backgroundColor:'#eb9800',display:'flex',
    flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2 style={{textDecoration:'none',textAlign:'center',fontWeight:'bold',color:'white'}}>Manage Payment</h2>
  </Box></Link>

  <Link to='/AdFeedback' style={{textDecorationLine:'none'}}><Box className='product-card' style={{width:'230px',height:'150px',backgroundColor:'#eb9800',display:'flex',
    flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2 style={{textDecoration:'none',textAlign:'center',fontWeight:'bold',color:'white'}}>{count.Feedback}<br/>Feedback</h2>
  </Box></Link>
   </div>
    </div>
     <Foot/>
     </>
  )
}
