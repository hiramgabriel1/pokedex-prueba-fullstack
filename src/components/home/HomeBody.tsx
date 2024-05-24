import React from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    title: "Entrenadores CRUD",
    description: "Basic page for creating, reading, updating and deleting Pokémon.",
    image: "/home/pokemon.png",
    route: "/pokemon",
  },
  {
    title: "Lista Pokedex",
    description: "Simple Pokedex with implementation of requests and search.",
    image: "/home/pokedex.png",
    route: "/pokedex",
  },
  {
    title: "Descargar PDF",
    description: "A simple pokedex interface with the option to download pokemons.",
    image: "/home/pokedexToPdf.png",
    route: "/pokemon/pdf",
  },
];

function HomeBody() {
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(route);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100vw",
     height: {xs: "80vh", sm: "85vh", md: "80vh"}, 
     flexDirection: {xs: "column", lg: "row"},
     flexWrap: {md: "wrap", lg: "unset"}
     }}>
      {cardData.map((card, index) => (
        <Card key={index} sx={{ 
          maxWidth: {sm: "350px", md: "300px", lg: "350px",xl: "400px"}, 
          maxHeight: {xs: "250px", sm: "275px",md: "400px"}
          }}>
          <CardMedia sx={{ height: {xs: 0, sm: 125, md: 200} }} image={card.image}></CardMedia>
          <CardContent>
            <Typography sx={{ textAlign: "center" }} gutterBottom variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button size="small" onClick={() => handleClick(card.route)}>Click here</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default HomeBody;
