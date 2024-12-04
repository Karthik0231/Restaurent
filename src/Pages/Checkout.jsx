import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


export default function Checkout() {
  // State for storing form data
  const host='http://localhost:7000'
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState('Pending');
  const [DishDetails, setDishDetails] = useState([]);
  const [open,setOpen]=useState(false);
  const [address, setAddress] = useState({
    address:'',
    city:'',
    state:'',
    zip:'',
    country:'India',
});

  
  // Predefined UPI ID (this could come from a backend or configuration)
  const prefilledUpiId = "user@upi";
  
  // Hardcoded total amount (this would typically come from cart data)
  const totalAmount = cart.reduce((acc, item) => acc + item.dish_id.price*item.qty, 0); // Calculate total from cart items
  
  // Order status (this could change based on payment status)
  
  // Fetch user details from API
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('userToken'));
    axios
      .get(`${host}/api/view`, { headers: { "auth-token": token } })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [host]);
  
  // Fetch cart data from API
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('userToken'));
    axios
      .get(`${host}/cart/view`, { headers: { "auth-token": token } })
      .then((res) => {
        setCart(res.data);

      })
      .catch((err) => {
        console.error(err);
      });
  }, [host]);

  const handleSubmit = (e) => {
   
    let data={...DishDetails,...user,totalAmount}
    let token = JSON.parse(localStorage.getItem('userToken'));

    axios
    .post(`${host}/cart/InsertDet`, data, { headers: { "auth-token": token } })
    .then((res) => {
      if(res.data){
        console.log(res.data)
        alert("Order Placed Successfully");
        setOpen(true)
      }else{
        console.log('some error occured')
      }
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    const handleChange = (e) => {
      setDishDetails({...DishDetails,[e.target.name]:e.target.value})

      }

  return (
    <MDBContainer className="my-5">
      <MDBRow>
        <MDBCol md="8" className="mx-auto">
          <div className="card p-4 shadow-lg rounded">
            <h3 className="text-center text-primary mb-4">Checkout</h3>

            {/* Display Cart Items and Grand Total */}
            <div className="mb-4">
              <MDBTypography tag="h5" className="text-center mb-3">
                <strong>Selected Items</strong>
              </MDBTypography>
              <ul className="list-group">
                {cart.length === 0 ? (
                  <li className="list-group-item">No items in your cart.</li>
                ) : (
                  cart.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                      <span>{item.dish_id.name}</span>
                      <span>₹{item.dish_id.price*item.qty}</span>
                    </li>
                  ))
                )}
              </ul>
              <div className="d-flex justify-content-between mt-3">
                <strong>Grand Total:</strong>
                <strong>₹{totalAmount}</strong>

              </div>
              
            </div>

            {/* User Details Input */}
            <div className="mt-4">
              <MDBInput
                label="Full Name"
                type="text"
                value={user.name}
                name='name'
                onChange={handleChange}
               className="mb-3"
                size="lg"
              />
              <MDBInput
                label="Email Address"
                type="email"
                name='email'
                value={user.email}
                onChange={handleChange}
                className="mb-3"
                size="lg"
              />
              <MDBInput
                label="Phone Number"
                type="text"
                name='phone'
                value={user.phone}
                onChange={handleChange} 
                className="mb-3"
                size="lg"
              />
              <MDBInput
                label="Address"
                type="text"
                name='address'
                onChange={handleChange}
                className="mb-3"
                size="lg"
              />
              <MDBInput
                label="City"
                type="text"
                name='city'
                onChange={handleChange}
                className="mb-3"
                size="lg"
              />
              <MDBInput
                label="Country"
                type="text"
                name='country'
                value={address.country}
                onChange={handleChange}

                // onChange={(e) => setCountry(e.target.value)}
                className="mb-3"
                size="lg"
              />
              <MDBInput
                label="Zip Code"
                type="text"
                name='zip'
                onChange={handleChange}

                // onChange={(e) => setZip(e.target.value)}
                className="mb-3"
                size="lg"
              />
            </div>

            {/* UPI ID (Prefilled) */}
            <div className="mt-4">
              <strong>UPI ID:</strong>
              <MDBInput
                label="UPI ID"
                type="text"
                value={prefilledUpiId}
                disabled // Make the UPI ID read-only
                className="mt-2 mb-3"
                size="lg"
              />
            </div>

            {/* QR Code Placeholder */}
            <div className="mt-4 text-center">
              <h5>Scan the QR Code to Pay</h5>
              {/* Placeholder for QR Code Image */}
              <img 
                src="https://via.placeholder.com/200" 
                alt="Payment QR Code" 
                className="img-fluid" 
                style={{ maxWidth: '250px', marginTop: '20px' }}
              />
              <p className="mt-3 text-muted">Scan this code to make the payment using UPI</p>
            </div>

            {/* Order Status */}
            <div className="mt-4 text-center">
              <strong>Status: </strong>
              <MDBTypography tag="span" style={{ color: status === 'Paid' ? 'green' : 'orange' }}>
                {status}
              </MDBTypography>
            </div>

            {/* Submit Payment Button */}
            <MDBBtn color="success" className="mt-4 w-100" size="lg" onClick={handleSubmit}>
              Pay Now
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
