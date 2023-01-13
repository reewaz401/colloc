import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import  { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
    <IconButton color="red" style={{ top: 50, }} aria-label="add to shopping cart" onClick={(e) => {
                  navigate('/create_colloc')
      // numExpense.forEach((ele, index) => {
      //   const values = numExpense;
      //   console.log(values);
      //   values.add(index);
      //   setNumExpense(values);
      // })
     
          }}>
      <AddIcon />
      </IconButton>
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
      </>
  );
}