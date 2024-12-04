import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCardImage, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import {MDBRating } from 'mdb-react-ui-kit';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';


export default function Status() {
  const host = 'http://localhost:7000'; // Replace with your API endpoint
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [modalOpen, setModalOpen] = useState(false); // Modal open/close state
  const [feedback, setFeedback] = useState(''); // Store feedback text
  const [rating, setRating] = useState(1); // Store rating value (1-5)
  const [basicModal, setBasicModal] = useState(false);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const navigate = useNavigate();

  const toggleOpen = () => setBasicModal(!basicModal);

  useEffect(() => {
    if(localStorage.getItem('userToken')===null){
      navigate('/login')
    }
  },[navigate])


  useEffect(() => {
    // Fetch data when the component mounts
    axios.get(`${host}/cart/getDetails`)
      .then((res) => {
        console.log('Fetched Data:', res.data);
        setItems(res.data);  // Log response data to console
        if (res.data && Array.isArray(res.data)) {
          setItems(res.data); // Store fetched data in state
        } else {
          console.error('Unexpected data structure:', res.data);
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log('Error:', err); // Log any errors
        setLoading(false); // Set loading to false even if an error occurs
      });
  }, []);

  const handleOpen = (id) => {
    setModalOpen(true); 
  };


  const handleClose = () => {
    setModalOpen(false);
    setFeedback(''); // Reset feedback
    setRating(1); // Reset rating
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value); // Update feedback as a string
  }

  const handleRatingChange = (e,newValue) => {
    setRating(newValue); // Update rating as a number
  }

  

  const handleSubmitFeedback = () => {
    const token = JSON.parse(localStorage.getItem('userToken')); // Get user token from local storage
    const data = { feedback, rating };

    axios.post(`${host}/feedback/insert`, data, { headers: { "auth-token": token } })
      .then(res => {
        if (res.data.success) {
          console.log('Feedback submitted successfully');
          handleClose(); // Close the modal after successful submission
        }
      })
      .catch((err) => {
        console.log('Error submitting feedback:', err);
      });
  };

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  

  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>
          {item.dish_id.map((dish,j) => (
            <div key={j}>
          <MDBCardImage
            src={`${host}/upload/${dish.dish_id.image}`} // Assuming dish_id contains image field
            alt={dish?.dish_id?.dish_id?.name} // Assuming dish_id contains name
          />
          
          <div>{dish.name}kjhjj</div>
          <div>Quantity: {dish.qty}</div>
          <div>Price: ${dish.dish_id.price}</div>
          <div>Status: {dish.dish_id.status}</div>

          {item.status === 'Delivered' ? (
      <MDBBtn onClick={toggleOpen}>FeedBack</MDBBtn>
    ) : item.status === 'Reject' ? (
            <MDBBtn>Cancelled</MDBBtn>
          ) : (
            <MDBBtn >Cancel</MDBBtn>
          )}
          </div>
                    ))}
        </div>
      ))}

      {/* Feedback Modal */}
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Submit Feedback</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBInput label="Name" id="typeText" type="text" name='title' onChange={handleFeedbackChange} required/>
            <MDBInput label="Feedback" id="typeText" type="text"  name='feedback' onChange={handleFeedbackChange} required/>
            <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>

      <Rating
        name="rating"
        value={rating}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={handleRatingChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>

            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmitFeedback}>Send</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
