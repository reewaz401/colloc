
import React, { Component, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import  { useNavigate } from 'react-router-dom'
import { createColloc } from '../controller/colloc_controller';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 130 },
  
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function InviteColloc() {
    const { flatId } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [selectColloc, setSelectColloc] = useState();
    const [emailColloc, setEmailColloc] = useState();
    const [colloc, setColloc] = useState([
        { id: 1, email: 'Snow', },
        { id: 2, email: 'Lannister', },
        { id: 3, email: 'Lannister', },
        { id: 4, email: 'Stark', },
        { id: 5, email: 'Targaryen', },
        { id: 6, email: 'Melisandre', },
        { id: 7, email: 'Clifford', },
        { id: 8, email: 'Frances', },
        { id: 9, email: 'Roxie', },
    ]);
    const handleCreate = () => {
        createColloc();
        navigate("/home");
    }
  return (
      <div style={{ height: 400, width: '100%', background: "white", marginTop: "100px" }}>
              {/* <Stack direction="row" spacing={1}> */}
{flatId}
    {/* </Stack> */}
          <TextField
              id="outlined-number"
              label="Invite Collocation"
              type="email"
              placeholder='Email'
              onChange={(e) => setEmailColloc(e.target.value) }
              InputLabelProps={{
                  shrink: true,
              }}
          />
          <IconButton color="red" aria-label="add to shopping cart" onClick={(e) => {
              console.log("ONE CLICK");
              setColloc(colloc => colloc.concat({ id: 10, email: emailColloc, }))
                }}>
        <AddIcon />
      </IconButton>
          { selectColloc ? selectColloc.length >0 ?<IconButton color="red" aria-label="add to shopping cart" onClick={(e) => {
              console.log("ONE CLICK");
              setColloc(colloc => colloc.concat({ id: 10, email: emailColloc, }))
          }}>
              <DeleteIcon />
          </IconButton>
              :<div></div>:<div></div>
          }
          
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
          />
          <div className='mt-3'>
         <Button variant="contained" endIcon={<SendIcon />} onClick={handleCreate}>
  Create
              </Button>
              </div>
          {/* <Button variant="contained" onClick={(e) => divideBudget(budget, colloc.length).then((rows) => setEachBudgett(rows))}>Divide</Button>
          {eachBudget} */}

    </div>
  );
}