import React, { Component, useState } from 'react'
import { postsignIn, postSignOut, postsignUp } from '../controller/user_controller';
import { Snackbar } from '@mui/material';
import  { useNavigate } from 'react-router-dom'
import { handlePostFormReq } from '../utils/req';
export default function Login() {
  const [userInfo, setUesrInfo] = useState({
firstname: "",
lastname: "",
username: "",
email: "",
pwd: "",
  });
  const [showSnack, setShowSanck] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUesrInfo({ ...userInfo, [event.target.name]: event.target.value });
  };
  const handleClose = (event,reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSanck(false);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      let response = await handlePostFormReq("/signin", userInfo);
      if (response.statut !== 200) {
        console.log(response);
        setShowSanck(true);
        setErrMessage(response.message);
      } else {
        navigate("/home");
      }
    } catch (err) {
      setShowSanck(true);
      setErrMessage("Something is wrong");
    }    
    
  };
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
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Prenom</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            placeholder="Prenom"
            value={userInfo.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Nom</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            placeholder="Nom"
            value={userInfo.lastname}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Identifiant</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Identifiant"
            value={userInfo.username}
            onChange={handleChange}
           
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={userInfo.email}
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
        </form>
        </div>
      </div>
      </>
    )
}

// import React, { Component } from 'react'

// export default class SignUp extends Component {
//   render() {
//     return (
//       <form>
//         <h3>Sign Up</h3>

//         <div className="mb-3">
//           <label>First name</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="First name"
//           />
//         </div>

//         <div className="mb-3">
//           <label>Last name</label>
//           <input type="text" className="form-control" placeholder="Last name" />
//         </div>

//         <div className="mb-3">
//           <label>Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter email"
//           />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//           />
//         </div>

//         <div className="d-grid">
//           <button type="submit" className="btn btn-primary">
//             Sign Up
//           </button>
//         </div>
//         <p className="forgot-password text-right">
//           Already registered <a href="/sign-in">sign in?</a>
//         </p>
//       </form>
//     )
//   }
// }
