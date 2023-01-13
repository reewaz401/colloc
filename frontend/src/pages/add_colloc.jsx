import React, { Component, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createColloc } from '../controller/colloc_controller';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import  { useNavigate } from 'react-router-dom'
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
export default function AddColloc() {
  const [expense, setExpense] = useState([]);
  const [numExpense, setNumExpense] = useState([1]);
  const navigate = useNavigate();
 const initialValues = {
  friends: [
    {
      name: '',
      price: 0,
    },
  ],
};

  const handleTypeExpense = (event, index) => {
    const mapInfo = { "id": index, "key": event.target.value, value: "" };
    setExpense(expense.push(mapInfo));
  };
  const handleAmountExpense = (event, index) => {
    expense.forEach((ele) => {
      if (ele.id == index) {
        ele.value = event.target.value
      }
    })
    console.log(expense);
  };
    const [collocInfo, setCollocInfo] = useState({
        address: "",
        end_date: "",
        image: "",
    });
  const handleChange = (event, index) => {
    setCollocInfo({ ...collocInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    console.log(initialValues);
      navigate("/invite_collocation");
    // prevents the submit button from refreshing the page
    event.preventDefault();
    
  };
  return (
    <div className="auth-wrapper">
    <div className='auth-inner'>

        <h3>Creation du Collocation</h3>
        
            <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        setCollocInfo({...collocInfo, "expenses" : values["friends"]})
        alert(JSON.stringify(collocInfo, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {({ insert, remove, push }) => (
              <div>
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
                        
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`friends.${index}.name`}>Expense Name</label>
                        
                        <Field
                          name={`friends.${index}.name`}
                          placeholder="Loyer"
                          type="text"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`friends.${index}.price`}>Prix</label>
                        <Field
                          name={`friends.${index}.price`}
                          placeholder="123"
                          type="number"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: '', price: '' })}
                >
                  Add Expense
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Suivant</button>
        </Form>
      )}
    </Formik>

          <br></br>
          <br></br>
          {/* <InputLabel id="demo-simple-select-label">Expense</InputLabel>
          { 
            [1,2,3].map((ele,index) => {
              return <div style={{ display: "flex" }}><Select
              style={{ marginRight: "8px" }}
              key={index}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Item"
              onChange={(e) => handleTypeExpense(e, index)}
            >
              <MenuItem value={1}>Loyer</MenuItem>
              <MenuItem value={2}>Gaz</MenuItem>
              <MenuItem value={3}>Electricite</MenuItem>
              <MenuItem value={4}>L'eau</MenuItem>
              <MenuItem value={5}>D'autres</MenuItem>
              </Select>
              <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Price"
            value={collocInfo.address}
            onChange={handleAmountExpense}
           
          />
              </div>
          })
          } */}
        <div className="d-grid">
          {/* <button type="submit" name="submit" className="btn btn-primary">
            Suivant
          </button> */}
        </div>

        </div>
        </div>
    )
}
