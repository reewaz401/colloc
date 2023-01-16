<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getColloc } from "../controller/colloc_controller";
import { handlePostFormReq } from "../utils/req";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 130 },
];
export default function CollocView() {
  const navigate = useNavigate();
  const [thisColloc, setThisColloc] = useState(null);
  const [thisRoommate, setThisRoommate] = useState([]);
  const [selectColloc, setSelectColloc] = useState();
  useEffect(() => {
    handlePostFormReq("/select_infos", { id_flatshare: 1 }).then((response) => {
      console.log(response.data);
      setThisColloc(response.data[0]);
    });
    handlePostFormReq("/select_all_roommate", {
      id_flatshare: 1,
    }).then((res) => {
      setThisRoommate(res.data);
    });
  }, []);
  return (
    <>
      <div>
        <Card sx={{ maxWidth: 345 }} className="mt-3">
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {thisColloc ? thisColloc.name : ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <HomeIcon size="small"></HomeIcon> Address :{" "}
              {thisColloc ? thisColloc.address : null}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {moment(thisColloc ? thisColloc.start_date : null).format(
                "DD MMMM YYYY"
              )}{" "}
              a{" "}
              {moment(thisColloc ? thisColloc.end_date : null).format(
                "DD MMMM YYYY"
              )}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="person" size="small">
              <PersonIcon fontSize="inherit" />
              13
            </IconButton>
          </CardActions>
          <div className="mb-3">
            <label>Nom</label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              placeholder="Nom"
            />
          </div>
        </Card>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={thisRoommate}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(rowData, rowState) => {
              setSelectColloc(rowData);
              console.log(rowData, rowState);
            }}
          />
        </div>
      </div>
    </>
=======
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
        Colocation en appartement meublé en hyper centre des Ulis – Essonne 91
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Transports : Autobus à 2min à pied : Mairie des Ulis Direction Orsay en 10min ou vers Massy en 20min, 40min de Paris en voiture, Métro Ligne 15 en préparation
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
              <IconButton aria-label="person" size="small">
                  <PersonIcon fontSize="inherit" />
                  13
</IconButton>
      </CardActions>
    </Card>
>>>>>>> test
  );
}