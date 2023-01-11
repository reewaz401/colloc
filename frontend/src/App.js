import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import AddColloc from './pages/add_colloc'
// import CollocTable from './pages/budget_division'
import InviteColloc from './pages/invite_collocation'
import CollocView from './pages/colloc_view'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Avec Collab_
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/create_colloc'}>
                    Creation du Colloc
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/invite_collocation'}>
                    Invite Colloc
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/colloc_view'}>
                    Colloc View
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

     
            <Routes>
              
              <Route exact path="/" element={<Login />} />
              <Route path="/add-colloc" element={<AddColloc/>} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/create_colloc" element={<AddColloc />} />
              <Route path="/invite_collocation" element={<InviteColloc />} />
              <Route path="/colloc_view" element={<CollocView />} />
            </Routes>
      </div>
    </Router>
  )
}

export default App
