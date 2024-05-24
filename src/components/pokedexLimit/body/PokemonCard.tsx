import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface Pokemon {
  name: string;
  imageUrl: string;
  type: string;
  abilities: string;
  id: number;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}
const capitalize = { textTransform: "capitalize" }

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0.2rem",
        border: "1px solid #ccc",
        transition: "border 0.3s ease-out",
        "&:hover": {
          border: "2px solid #2196F3",
        },
        minWidth: "150px",
        maxWidth: "190px",
        maxHeight: "22rem",
      }}
    >
      <img src={pokemon.imageUrl || "/pokedex/missing.jpg"} alt="" />
      <CardContent>
        <Typography>Id: {pokemon.id}</Typography>
        <Typography sx={capitalize}>Name: {pokemon.name}</Typography>
        <Typography sx={capitalize}>Type: {pokemon.type}</Typography>
        <Typography sx={capitalize}>Abilities: {pokemon.abilities}</Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;