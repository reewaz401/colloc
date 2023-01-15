import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getColloc } from "../controller/colloc_controller";

export default function CollocView({ collocInfo }) {
  const navigate = useNavigate();
  const [thisColloc, setThisColloc] = useState();

  useEffect(async () => {
    const response = await getColloc();
    setThisColloc(response.data);
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
      </div>
    </>
  );
}
