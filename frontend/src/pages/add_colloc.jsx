import React, { Component, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { createColloc } from "../controller/colloc_controller";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { handlePostFormReq } from "../utils/req";
import { useSelector } from "react-redux";
import { storeFlatId } from "../store/actions/flatIdAction";
export default function AddColloc() {
  const { usersInfo } = useSelector((state) => state.auth);
  console.log("USERS", usersInfo[0].id);
  const userId = usersInfo[0].id;
  console.log("USERSTOK", userId);
  const [numExpense, setNumExpense] = useState([1]);
  const [showSnack, setShowSanck] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSanck(false);
  };
  const initialValues = {
    friends: [
      {
        name: "",
        price: 0,
      },
    ],
  };

  const handleTypeExpense = (event, index) => {
    const mapInfo = { id: index, key: event.target.value, value: "" };
    setExpense(expense.push(mapInfo));
  };
  const handleAmountExpense = (event, index) => {
    expense.forEach((ele) => {
      if (ele.id == index) {
        ele.value = event.target.value;
      }
    });
    console.log(expense);
  };
  const [collocInfo, setCollocInfo] = useState({
    id_creator: userId,
    address: "6 rue jusdsdsdstin",
    name: "NASSCOLOC",
    start_date: "2023/02/01",
    end_date: "2023/02/01",
  });
  const [expense, setExpense] = useState(0);
  const handleChange = (event, index) => {
    if (event.target.name == "start_date" || event.target.name == "end_date") {
      console.log("EMD DATE", event.target.value.format("YYYY/MM/DD"));
      setCollocInfo({
        ...collocInfo,
        [event.target.name]: event.target.value.format("YYYY/MM/DD"),
      });
    } else {
      setCollocInfo({ ...collocInfo, [event.target.name]: event.target.value });
    }
  };
  const handleSubmit = async () => {
    //  event.preventDefault();
    console.log("FKATE", collocInfo);
    try {
      let response = await handlePostFormReq("/create_flatshare", collocInfo);

      if (response.status !== 200) {
        setShowSanck(true);
        setErrMessage(response.message);
      } else {
        dispatch(storeFlatId(response.data.id));
        navigate("/invite_collocation");
      }
    } catch (err) {
      setShowSanck(true);
      setErrMessage("Something is wrong");
    }

    // prevents the submit button from refreshing the page
    //event.preventDefault();
  };
  const handleExpenseChange = async (e) => {
    setExpense(e.target.value);
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
        <div className="auth-inner">
          <h3>Creation du Collocation du </h3>

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
                  setCollocInfo({
                    ...collocInfo,
                    start_date: newValue.format("YYYY/MM/DD"),
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="End date"
                value={collocInfo.end_date}
                onChange={(newValue) => {
                  setCollocInfo({
                    ...collocInfo,
                    end_date: newValue.format("YYYY/MM/DD"),
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="mb-3">
            <label>Menuel</label>
            <input
              type="number"
              name="expense"
              placeholder="Depense"
              value={expense}
              onChange={handleExpenseChange}
            />
          </div>

          <button type="submit" onClick={handleSubmit}>
            Suivant
          </button>

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
  );
}
