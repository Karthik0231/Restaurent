import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom'; 
export default function SingleRec() {
  const [show, setShow] = useState('');

  const { id } = useParams(); 
  const host = 'http://localhost:7000';

  useEffect(() => {
    if (id) {
        axios.get(`${host}/api/singleView/${id}`)
            .then((res) => {
                console.log(res.data)   
                setShow(res.data.data)
            })
            .catch((err) => {
                console.log("Error in data fetching", err);
            });
    }
}, [id]);  
const handleCart=(e)=>{
    let token=JSON.parse(localStorage.getItem('userToken'))
    console.log(token)
    axios.post(`${host}/cart/Insert/${id}`,null,{headers:{"auth-token":token}})
    .then((res)=>{
        alert("Added to cart")
        if(res.data.success){
            Navigate('/')
        }
})
.catch((err)=>{
    console.log("Error in data fetching", err);
    alert(err.message)
})
}

  return (
    <MDBContainer className="my-5">
      <MDBRow>
        <MDBCol md="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBCardTitle tag="h3">{show.name}</MDBCardTitle>

                <MDBCardImage
                  src={`${host}/upload/${show.image}`}
                  alt={show.name}
                  position="top"
                  style={{height:'70vh'}}                />
              <MDBBtn onClick={handleCart} className="mt-4">Add to Cart</MDBBtn>

              <MDBRow className="mt-4">
              <MDBCol sm="4">
                  <strong>Meal Type:</strong>
                  <p>{show.mealType}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Meal Type:</strong>
                  <p>{show.extrafood}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Prep Time:</strong>
                  <p>{show.preptime}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Cook Time:</strong>
                  <p>{show.cookTime}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Calories:</strong>
                  <p>{show.calories}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Dietary Type:</strong>
                  <p>{show.dietarytype}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Total Carbohydrates:</strong>
                  <p>{show.TotalCarbohydrates}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Protein:</strong>
                  <p>{show.protein}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Total Fat:</strong>
                  <p>{show.totalFat}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Description:</strong>
                  <p>{show.description}</p>
                </MDBCol>
                <MDBCol sm="4">
                  <strong>Status:</strong>
                  <p>{show.status}</p>
                </MDBCol>
              </MDBRow>
              {/* Back Button */}
              <MDBBtn href="/" className="mt-4">Back</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
