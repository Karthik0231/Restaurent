import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Hook for navigation

export default function Cart() {
  const host = 'http://localhost:7000';
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userToken'));
    if (token) {
      axios.get(`${host}/cart/view`, { headers: { "auth-token": token } })
        .then((res) => {
          setCartItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching cart items:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
      console.log('User not logged in');
    }
  }, []);

  const handleRemove = (id) => {
    const token = JSON.parse(localStorage.getItem('UserToken'));
    axios.delete(`${host}/cart/delete/${id}`, { headers: { "auth-token": token } })
      .then((res) => {
        alert("Deleted Successfully");
        setCartItems(cartItems.filter(item => item._id !== id));  // Remove the item from the state
      })
      .catch((err) => {
        console.log('Error removing item:', err);
        alert('Failed to remove item');
      });
  };

  const handleUpdateQuantity = (id, action) => {
    const token = JSON.parse(localStorage.getItem('UserToken'));
    const updateData = { action };

    axios.put(`${host}/cart/update/${id}`, updateData, { headers: { "auth-token": token } })
      .then((res) => {
        if (res.data) {
          setCartItems(prevItems => prevItems.map(item =>
            item._id === id ? { ...item, qty: action === 'increase' ? item.qty + 1 : item.qty - 1 } : item
          ));
        } else {
          console.log('Error updating quantity');
        }
      })
      .catch((err) => {
        console.log('Error updating quantity:', err);
      });
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.dish_id.price * item.qty, 0);  // Use item.qty for quantity
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <MDBContainer className="my-5">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <MDBRow>
          {cartItems.map((item) => (
            <MDBCol md="4" key={item._id} className="mb-4">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle>{item.dish_id.name}</MDBCardTitle>
                  <MDBCardImage
                    src={`${host}/upload/${item.dish_id.image}`}
                    alt={item.dish_id.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                    position="top"
                  />
                  <div className="mt-3">
                    <strong>Price:</strong> ${item.dish_id.price}
                  </div>
                  <div className="mt-3">
                    <strong>Quantity:</strong>
                    <div className="d-flex align-items-center">
                      {/* Simple + and - buttons */}
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleUpdateQuantity(item._id, 'decrease')}
                        style={{ fontSize: '1.5rem' }}
                      >
                        -
                      </button>
                      <span className="mx-2" style={{ fontSize: '1.2rem' }}>{item.qty}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleUpdateQuantity(item._id, 'increase')}
                        style={{ fontSize: '1.5rem' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <MDBBtn color="danger" size="sm" onClick={() => handleRemove(item._id)} className="mt-3">
                    Remove
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      )}

      <div className="d-flex justify-content-between mt-4">
        <h4>Total: ${calculateTotal().toFixed(2)}</h4>
        <div>
          <MDBBtn color="primary">Continue Shopping</MDBBtn>
          <Link to="/Payment"><MDBBtn color="success" className="ms-2">Proceed to Checkout</MDBBtn></Link>
        </div>
      </div>
    </MDBContainer>
  );
}
