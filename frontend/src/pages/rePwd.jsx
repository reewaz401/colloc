import React, { Component, useState } from 'react'
import '../index.css'
export default function RePwd() {
  const [userInfo, setUesrInfo] = useState({oldPassword:"",newPassword1:"", newPassword2:""});
  const [showSnack, setShowSanck] = useState(false);
  const handleChange = (event) => {
    setUesrInfo({ ...userInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    
  };
  return (<>
    <div className="auth-wrapper">
      <div className='auth-inner'>
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Old Password</label>
          <input
            type="email"
            name="mail"
            className="form-control"
            placeholder="Enter email"
            value={userInfo.oldPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={userInfo.newPassword1}
            onChange={handleChange}
           
          />
        </div>
        <div className="mb-3">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={userInfo.newPassword2}
            onChange={handleChange}
           
          />
        </div>


        <div className="d-grid">
          <button type="submit" name="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
    </>
    )
}
