import React, { Component, useState } from 'react'
import { postsignIn } from '../controller/user_controller';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import '../index.css'
import SimpleSnackBar from './snackBar';
import { Snackbar } from '@mui/material';
import { handlePostFormReq, handlePostReq } from '../utils/req';
import { useDispatch } from 'react-redux';
import { storeUserInfo } from '../store/actions/simpleAction';
export default function Login() {
  const dispatch = useDispatch();
  const [userInfo, setUesrInfo] = useState({username:"",pwd:""});
  const [showSnack, setShowSanck] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUesrInfo({ ...userInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await handlePostFormReq("/login", userInfo);
      if (response.status !== 200) {
        setShowSanck(true);
        setErrMessage(response.message);
      } else {
        console.log(response.data);
        dispatch(storeUserInfo(response.data[0]));
        navigate("/home");
      }
    } catch (err) {
      setShowSanck(true);
      setErrMessage("Something is wrong");
    }    
  };

  const handleClose = (event,reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSanck(false);
  };
  const handleResetPwd = (event) => {
    navigate("/repwd")
  }
  return (<>
    <Snackbar
      message={errMessage}
      autoHideDuration={4000}
      open={showSnack}
      onClose={handleClose}
    ></Snackbar>
    <div className="auth-wrapper">
      <div className='auth-inner'>
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter username"
            value={userInfo.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="pwd"
            className="form-control"
            placeholder="Enter password"
            value={userInfo.pwd}
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
