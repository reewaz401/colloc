import React, { Component, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createColloc } from "../controller/colloc_controller";
import { handlePostFormReq } from "../utils/req";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 130 },
];

const rows = [];

export default function InviteColloc() {
  const { flatId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [selectColloc, setSelectColloc] = useState();
  const flatid = flatId;
  console.log("FLATT ", flatid);
  const [emailColloc, setEmailColloc] = useState({
    id_flatshare: flatid,
    role: 0,
    new_roomate: null,
  });
  const [colloc, setColloc] = useState([]);
  const handleCreate = () => {
    createColloc();
    navigate("/home");
  };
  const handleAddRoommate = async (email) => {
    await handlePostFormReq("/add_roommate", emailColloc);
    setEmailColloc({
      id_flatshare: null,
      role: null,
      new_roomate: null,
    });
  };
  return (
    <div
      style={{
        height: 400,
        width: "100%",
        background: "white",
        marginTop: "100px",
      }}
    >
      {/* <Stack direction="row" spacing={1}> */}
      {flatId}
      {/* </Stack> */}
      <TextField
        id="outlined-number"
        label="Invite Collocation"
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmailColloc({ ...emailColloc, new_roomate: e.target.value })
        }
        InputLabelProps={{
          shrink: true,
        }}
      />
      <IconButton
        color="red"
        aria-label="add to shopping cart"
        onClick={(e) => {
          console.log("ONE CLICK");
          setEmailColloc({
            id_flatshare: flatId,
            role: 0,
            new_roomate: emailColloc,
          });
          handleAddRoommate();
          setColloc((colloc) => colloc.concat({ id: 10, email: emailColloc }));
        }}
      >
        <AddIcon />
      </IconButton>
      {selectColloc ? (
        selectColloc.length > 0 ? (
          <IconButton
            color="red"
            aria-label="add to shopping cart"
            onClick={(e) => {
              console.log("ONE CLICK");
              setColloc((colloc) =>
                colloc.concat({ id: 10, email: emailColloc })
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      )}
      {/* 
      <DataGrid
        rows={colloc}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(rowData, rowState) => {
          setSelectColloc(rowData);
          console.log(rowData, rowState);
        }}
      /> */}
      <div className="mt-3">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleCreate}
        >
          Done
        </Button>
      </div>
      {/* <Button variant="contained" onClick={(e) => divideBudget(budget, colloc.length).then((rows) => setEachBudgett(rows))}>Divide</Button>
          {eachBudget} */}
    </div>
  );
}
