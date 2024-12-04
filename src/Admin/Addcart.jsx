import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Addcart() {
  const nav=useNavigate()
  const host='http://localhost:7000'
const [name, setName] = useState({
  category:''
});
const handleChange=(e)=>{
  setName({...name,[e.target.name]:e.target.value})
}

const handleSubmit=(e)=>{
  e.preventDefault()
  axios
  .post(`${host}/api/catinsert`,name)
  .then((res)=>{
    if(res.data){
      alert("Added Successfully")
      nav('/ManageCat')
    }
})
  .catch((err)=>{
  console.error("Error in data",err)
});
};
  return (
    <div>
      <TextField label="Category Name" name='category' onChange={handleChange} variant="outlined" />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </div>
  );
}