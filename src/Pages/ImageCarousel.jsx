import React, {useState,useEffect} from 'react'
import '../Css/ImageCarousel.css'

const images=[
    require('../Assets/F1.png'),
    require('../Assets/F2.png'),
    require('../Assets/F3.png')
];
export default function ImageCarousel() {
    const [currentIndex,setCurrentIndex]=useState(0);
     
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCurrentIndex((prevIndex)=>(prevIndex+1)%images.length); 
        },3000) 
        return()=>clearInterval(interval)
    },[]);
    
  return (
    <div>
      <div className="carousel-container">
        {images.map((image,index)=>(
        <div
        key={index}
        className={`carousel-image ${index===currentIndex? 'active':''}`}
        style={{backgroundImage:`url(${image})`}}/>))}
      </div>
    </div>
  )
}
