import React, { Component, useState } from 'react'
import { postSignOut } from '../controller/user_controller';
export default function Login() {
  const [userInfo, setUesrInfo] = useState({
    prenom: "",
    nom: "",
    identifiant: "",
    mail: "",
    password: "",

  });
  const handleChange = (event) => {
    setUesrInfo({ ...userInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    postSignOut(userInfo);
    // prevents the submit button from refreshing the page
    event.preventDefault();
    
  };
  return (
    <div className="auth-wrapper">
    <div className='auth-inner'>
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Prenom</label>
          <input
            type="text"
            name="prenom"
            className="form-control"
            placeholder="Prenom"
            value={userInfo.prenom}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            className="form-control"
            placeholder="Nom"
            value={userInfo.nom}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Identifiant</label>
          <input
            type="text"
            name="identifiant"
            className="form-control"
            placeholder="Identifiant"
            value={userInfo.identifiant}
            onChange={handleChange}
           
          />
        </div>
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
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        </form>
        </div>
        </div>
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
