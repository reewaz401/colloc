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
import { useSelector } from "react-redux";
import { handleGetReq } from "../utils/req";

export default function Home() {
  const navigate = useNavigate();
  const { usersInfo } = useSelector((state) => state.auth);
  const [flatShare, setFlatShare] = useState([]);
  const divClick = () => {};
  useEffect(() => {
    const dataFetch = async () => {
      const res = await handleGetReq("/selectAll");
      console.log("FOF", res.data.data);
      setFlatShare(res.data.data);
    };
    dataFetch();
    // Update the document title using the browser API
  }, []);
  return (
    <>
      <div
        id="mainContent"
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "10px",
          gridAutoRows: "minMax(100px, auto)",
        }}
      >
        {flatShare.map((ele, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} className="mt-3" key={index}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {ele.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <HomeIcon size="small"></HomeIcon> Address : {ele.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {moment(ele.start_date).format("DD MMMM YYYY")} a{" "}
                  {moment(ele.end_date).format("DD MMMM YYYY")}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate("/colloc_view/" + ele.id)}
                >
                  More
                </Button>
                <IconButton aria-label="person" size="small">
                  <PersonIcon fontSize="inherit" />
                  13
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
}
