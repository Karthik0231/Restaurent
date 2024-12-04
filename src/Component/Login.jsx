import React,{useState} from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const nav=useNavigate();
    const[userData,setUserData]=useState({});
    const host='http://localhost:7000'

    const handleChange=(e)=>{
        setUserData({...userData,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      axios
      .post(`${host}/api/login`,userData)
      .then((res)=>{
          console.log(res);
          if(res.data.success===true){
              console.log(res.data.userToken,"res.data.userToken")
              localStorage.setItem("userToken",JSON.stringify(res.data.userToken))
              alert("Login Successfully")
              nav("/")
          }else{
              alert("Please enter valid details")
          }
      })
      .catch((err)=>{
          console.error("Error in data",err)
          alert("Please enter valid details")
      });
  }

  return (
    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>


          <MDBInput wrapperClass='mb-4' label='Email address' name='email' type='email' onChange={handleChange} size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' name='password' onChange={handleChange} type='password' size="lg"/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleSubmit}>Sign in</MDBBtn>

          <div className="text-center">
            <p>Not a member? <a href="/Reg">Register</a></p>
          </div>

          

         
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

