import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import AddColloc from "./pages/add_colloc";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

// import CollocTable from './pages/budget_division'
import InviteColloc from "./pages/invite_collocation";
import Home from "./pages/home";
import RePwd from "./pages/rePwd";
import CollocView from "./pages/colloc_view";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "./store/actions/simpleAction";
function SimpleDialog(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleLogout = (value) => {
    localStorage.setItem("user", "");
    onClose(value);
    dispatch(storeUserInfo(null));
    navigate("/sign-in");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Profile</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleLogout()}>
            <ListItemAvatar>
              <Avatar>
                <LogoutIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
function App() {
  let pathurl;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const { usersInfo } = useSelector((state) => state.auth);
  // componentDidUpdate(() => {
  //   console.log("Asa");
  //    pathurl = window.location.pathname;
  // });
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              Avec Collab_
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {localStorage.getItem("user") ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/create_colloc"}>
                        Creation du Colloc
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/invite_collocation"}>
                        Invite Colloc
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/home"}>
                        Colloc View
                      </Link>
                    </li>
                    <li>
                      <div>
                        <Button variant="outlined" onClick={handleClickOpen}>
                          Profile
                        </Button>
                        <SimpleDialog
                          selectedValue={selectedValue}
                          open={open}
                          onClose={handleClose}
                        />
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>
                        Sign up
                      </Link>
                    </li>
                  </>
                )}

                {pathurl === "/home" ? (
                  <IconButton
                    color="red"
                    aria-label="add to shopping cart"
                    onClick={(e) => {
                      // numExpense.forEach((ele, index) => {
                      //   const values = numExpense;
                      //   console.log(values);
                      //   values.add(index);
                      //   setNumExpense(values);
                      // })
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                ) : (
                  <div></div>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/add-colloc" element={<AddColloc />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/create_colloc" element={<AddColloc />} />
          <Route path="/invite_collocation" element={<InviteColloc />} />
          <Route path="/home" element={<Home />} />
          <Route path="/repwd" element={<RePwd />} />
          <Route path="/colloc_view/:id" element={<CollocView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
