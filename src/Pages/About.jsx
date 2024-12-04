import React,{useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { faGitkraken } from '@fortawesome/free-brands-svg-icons';
import Image from '../Assets/F3.png';
import Nav from '../Component/Nav';
import Footer from '../Component/Foot';
import Box  from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
// import '../../css/home.css'

export default function About() {
  const navigate=useNavigate()
  useEffect(() => {
    if(localStorage.getItem('userToken')===null){
      navigate('/login')
    }
  },[navigate])

  return (
    <Box>
    <Box className="container-fluid about py-5" style={{ maxHeight:'900px', marginTop:'100px', marginBottom:'100px'}} >
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-lg-5">
          <div className="video">
            <img src={Image} className="img-fluid rounded" alt=""  style={{ height:"250px" }} />
            <div className="position-absolute rounded border-5 border-top border-start border-white" style={{ bottom: 0, right: 0, width:"200px" }}>
              {/* <img src={Image} className="img-fluid rounded" alt="" /> */}
            </div>
            <button type="button" className="btn btn-play" data-bs-toggle="modal" data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-bs-target="#videoModal">
              <span></span>
            </button>
          </div>
        </div>
        <div className="col-lg-7">
          <div>
            <p className="fs-4 text-uppercase text-primary">About Us</p>
            {/* <h1 className="display-4 mb-4">Your Best Spa, Beauty & Skin Care Center</h1> */}
            {/* <p className="mb-4">Our goal is to make health and fitness attainable, affordable and approachable.</p> */}
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faGitkraken} size="3x" className="text-primary" />
                  <div className="ms-4">
                    {/* <h5 className="mb-2">Special Offers</h5> */}
                    <p className="mb-0">Created to help you live a better, happier, healthier life.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faGitkraken} size="3x" className="text-primary" />
                  <div className="ms-4">
                    {/* <h5 className="mb-2">Special Offers</h5> */}
                    <p className="mb-0">Our goal is to make health and fitness attainable, affordable and approachable.</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="my-4">We believe fitness should be accessible to everyone, everywhere, regardless of income level or access to a gym. That's why we offer hundreds of free, full-length workout videos, the most affordable and effective workout programs on the web, meal plans, and helpful health, nutrition and fitness information.</p>
            {/* <p className="mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
          </div>
          {/* <a href="#" className="btn btn-primary btn-primary-outline-0 rounded-pill py-3 px-5">Explore More</a> */}
        </div>
      </div>
    </div>

   

  </Box>
  <div className="container">
  <div className="left-section">
    {/* <h1 className="title">Healthy Recipes</h1> */}
    {/* <p>Fuel your day with recipes by Registered Dietitians and professional chefs.</p> */}
    {/* <button className="button">Find a Recipe</button> */}
    <div className="food-image">
      {/* Image of pasta with tomato and pesto */}
    
    </div>
  </div>&nbsp;&nbsp;
  <div className="right-section">
    {/* <h1 className="title" style={{marginTop:'-25px'}}>Supportive Community</h1> */}
    {/* <p>Stay motivated and engaged with a little help from a supportive community of other members.</p> */}
    {/* <button className="button">Become a Member</button> */}
    <div className="people-image">
      {/* Image of group of people smiling */}
    </div>
  </div>
</div><br/><br/>

  <Footer/>
  </Box>
  )
}

  