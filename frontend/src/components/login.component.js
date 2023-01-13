import React, { Component, useState } from 'react'
import { postsignIn } from '../controller/user_controller';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import '../index.css'
import SimpleSnackBar from './snackBar';
export default function Login() {
  const [userInfo, setUesrInfo] = useState({mail:"",password:""});
  const [showSnack, setShowSanck] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUesrInfo({ ...userInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    postsignIn(userInfo).then((res) => {
      navigate("/home");
    }).catch((err) => {
      setShowSanck(true);
    });
    // prevents the submit button from refreshing the page
    event.preventDefault();
    
  };
  const handleResetPwd = (event) => {
    navigate("/repwd")
  }
  return (<>
    <SimpleSnackBar show={showSnack}/>
    <div className="auth-wrapper">
      <div className='auth-inner'>
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="mail"
            className="form-control"
            placeholder="Enter email"
            value={userInfo.mail}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={userInfo.password}
            onChange={handleChange}
           
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" name="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
            <Button onClick={handleResetPwd}>Forgot password?</Button> 
      </form>
      </div>
    </div>
    </>
    )
}
