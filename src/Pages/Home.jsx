import React from 'react'
import ImageCarousel from './ImageCarousel'
import Categorylist from './Categorylist'
import Recipeslist from './Recipeslist'
import Foot from '../Component/Foot'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {
  const navigate=useNavigate()
  useEffect(() => {
    if(localStorage.getItem('userToken')===null){
      navigate('/login')
    }
  },[navigate])
  return (
    <div className='home-container'>
        <main className='main-content'>
            <div className="carousel-with-text">
                <ImageCarousel/>
                <h1 style={{textAlign:'center'}}>Restaurant Management System</h1>
            </div>
        </main><br /><br />
        <Categorylist/>
        <Recipeslist/>
        <Foot/>

    </div>
  )
}
