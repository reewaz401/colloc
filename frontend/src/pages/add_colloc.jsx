import React, { Component, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createColloc } from '../controller/colloc_controller';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { Snackbar } from '@mui/material';
import  { useNavigate } from 'react-router-dom'
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { handlePostFormReq } from '../utils/req';
import { useSelector } from 'react-redux';
export default function AddColloc() {
  const  userInfo  = useSelector(state => state.auth);
  const [expense, setExpense] = useState([]);
  const [numExpense, setNumExpense] = useState([1]);
  const [showSnack, setShowSanck] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const handleClose = (event,reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSanck(false);
  };
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
      "id_creator": userInfo.id,
      "address": "6 rue jusdsdsdstin",
      "name": "NASSCOLOC",
      "start_date": "2023/02/01",
      "end_date": "2023/02/01",
    });
  const handleChange = (event, index) => {
    if (event.target.name == "start_date" || event.target.name == "end_date") {
      console.log("EMD DATE", event.target.value.format("YYYY/MM/DD"));
      setCollocInfo({ ...collocInfo, [event.target.name]: event.target.value.format("YYYY/MM/DD") });
    }
    else {
      
    
      setCollocInfo({ ...collocInfo, [event.target.name]: event.target.value });
    }
  };
  const handleSubmit = async () => {
  //  event.preventDefault();
    try {
      let response = await handlePostFormReq("/create_flatshare", collocInfo);
      if (response.statut !== 200) {
        console.log(response);
        setShowSanck(true);
        setErrMessage(response.message);
      } else {
        navigate("/invite_collocation");
      }
    } catch (err) {
      setShowSanck(true);
      setErrMessage("Something is wrong");
    }  
      
    // prevents the submit button from refreshing the page
    //event.preventDefault();
    
  };
  const handleExpenseSubmit = async (val) => {
    // event.preventDefault();
    try {
      let response = await handlePostFormReq("/create_expenditure", val);
      if (response.statut !== 200) {
        console.log(response);
        setShowSanck(true);
        setErrMessage(response.message);
      } else {
        navigate("/invite_collocation");
      }
    } catch (err) {
      setShowSanck(true);
      setErrMessage("Something is wrong");
    }  
  }
  return (
    <>
        <Snackbar
      message={errMessage}
      autoHideDuration={4000}
      open={showSnack}
      onClose={handleClose}
    ></Snackbar>
    <div className="auth-wrapper">
    <div className='auth-inner'>

        <h3>Creation du Collocation</h3>
        
            <Formik
      initialValues={initialValues}
            onSubmit={async (values) => {
              await handleSubmit();
             // await handleExpenseSubmit(values["friends"]);
        
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
    label="Start date"
    value={collocInfo.start_date}
                          onChange={(newValue) => {
        setCollocInfo({ ...collocInfo, start_date: newValue.format("YYYY/MM/DD")});;
    }}
    renderInput={(params) => <TextField {...params} />}
                        />
  <DatePicker
    label="End date"
    value={collocInfo.end_date}
                          onChange={(newValue) => {
        setCollocInfo({ ...collocInfo, end_date: newValue.format("YYYY/MM/DD")});;
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
      </>
    )
}
