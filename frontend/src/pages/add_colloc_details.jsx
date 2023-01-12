import React, { Component, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createColloc } from '../controller/colloc_controller';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
export default function AddColloc() {
    const [collocInfo, setCollocInfo] = useState({
        address: "",
        end_date: "",
        image: "",
    });
  const handleChange = (event) => {
    setCollocInfo({ ...collocInfo, [event.target.name]: event.target.value });
  };
    const handleSubmit = (event) => {
        createColloc(collocInfo);
    // prevents the submit button from refreshing the page
    event.preventDefault();
    
  };
  return (
    <div className="auth-wrapper">
    <div className='auth-inner'>
      <form onSubmit={handleSubmit}>
        <h3>Creation du Collocation</h3>
        <div className="mb-3">
          <label>Addresse</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Addresse"
            value={collocInfo.address}
            onChange={handleChange}
           
          />
        </div>
      
           
            
            <LocalizationProvider dateAdapter={AdapterMoment}>
  <DatePicker
    label="End date"
    value={collocInfo.end_date}
    onChange={(newValue) => {
        setCollocInfo({ ...collocInfo, end_date: newValue });;
    }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>
          <br></br>
          <br></br>
        <div className="d-grid">
          <button type="submit" name="submit" className="btn btn-primary">
            Create
          </button>
        </div>
        </form>
        </div>
        </div>
    )
}
