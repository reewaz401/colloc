
import React, { Component, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { divideBudget } from '../controller/budet_controller';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
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

export default function CollocTable() {
    const [budget, setBudget] = useState();
    const [colloc, setColloc] = useState([]);
    const [eachBudget, setEachBudgett] = useState();
  return (
      <div style={{ height: 400, width: '100%', background: "white", marginTop: "100px" }}>
          <TextField
              id="outlined-number"
              label="Budget"
              type="number"
              InputLabelProps={{
                  shrink: true,
              }}
              onChange={(e) => setBudget(e.target.value)}/>
      <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(rowData, rowState) => {
                  setColloc(rowData);
                  console.log(rowData, rowState);
              }}
          />
          <Button variant="contained" onClick={(e) => divideBudget(budget, colloc.length).then((rows) => setEachBudgett(rows))}>Divide</Button>
          {eachBudget}

    </div>
  );
}