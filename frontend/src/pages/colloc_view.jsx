import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  getColloc,
  getRoomate,
  kickRoomate,
} from "../controller/colloc_controller";
import { useSelector } from "react-redux";
import { handlePostFormReq } from "../utils/req";

export default function CollocView() {
  const { flatInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const flatInformation = flatInfo;
  const [roommateList, setRoomateList] = useState([]);
  const [thisColloc, setThisColloc] = useState(flatInformation);
  const [emailColloc, setEmailColloc] = useState({
    id_flatshare: flatInformation.id,
    role: 0,
    new_roomate: null,
  });
  const handleAddRoommate = async (email) => {
    await handlePostFormReq("/add_roommate", emailColloc);
    setEmailColloc({
      id_flatshare: null,
      role: null,
      new_roomate: null,
    });
    getRoomate({
      id_flatshare: flatInformation.id,
    }).then((res) => {
      setRoomateList(res.data);
    });
  };
  console.log("CONS", flatInformation);
  const handleDelete = (e) => {
    console.log("KICK", e.target.name);
    kickRoomate({
      id_flatshare: flatInformation.id,
      email_roommate: e.target.name,
    }).then((res) => {
      getRoomate({
        id_flatshare: flatInformation.id,
      }).then((res) => {
        setRoomateList(res.data);
      });
    });
  };
  useEffect(() => {
    console.log("USE EFEC");
    getRoomate({
      id_flatshare: flatInformation.id,
    }).then((res) => {
      console.log(res);
      setRoomateList(res.data);
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
              {thisColloc.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <HomeIcon size="small"></HomeIcon> Address : {thisColloc.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {moment(thisColloc.start_date).format("DD MMMM YYYY")} a{" "}
              {moment(thisColloc.end_date).format("DD MMMM YYYY")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => navigate("/colloc_view/" + thisColloc.id)}
            >
              More
            </Button>
            <IconButton aria-label="person" size="small">
              <PersonIcon fontSize="inherit" />
              13
            </IconButton>
          </CardActions>
        </Card>
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
              id_flatshare: flatInformation.id,
              role: 0,
              new_roomate: emailColloc,
            });
            handleAddRoommate();
          }}
        >
          <AddIcon />
        </IconButton>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Expense</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roommateList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">??</TableCell>
                  <TableCell align="right">
                    {" "}
                    <button
                      name={row.email}
                      type="submit"
                      onClick={(e) => {
                        handleDelete(e);
                      }}
                    >
                      Kick
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
