import React from "react";
import { Card, CardContent, CardActions, Button, ListItemText } from "@mui/material";

interface Pokemon {
    _id: string;
    name: string;
    type: string;
    imageUrl: string;
  }

interface PokemonCardProps {
  pokemon: Pokemon; // Assuming Pokemon is defined in PokemonCRUD.tsx
  editingPokemon: Pokemon | null;
  handleUpdatePokemon: () => void;
  handleCancelEdit: () => void;
  handleEditPokemon: (pokemon: Pokemon) => void;
  handleDeletePokemon: (id: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  editingPokemon,
  handleUpdatePokemon,
  handleCancelEdit,
  handleEditPokemon,
  handleDeletePokemon,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "1px solid #ccc",
        transition: "border 0.3s ease-out",
        "&:hover": {
          border: "2px solid #2196F3",
        },
        backgroundColor: editingPokemon === pokemon ? "" : "#F3F3F3",
        minWidth: "150px",
      }}
    >
      <img src={pokemon.imageUrl || "/pokemon/missing.jpeg"} alt="" />
      <CardContent>
        <ListItemText sx={{ textTransform: "capitalize" }} primary={`Name: ${pokemon.name}`} />
        <ListItemText sx={{ textTransform: "capitalize" }} primary={`Type: ${pokemon.type}`} />
      </CardContent>
      <CardActions>
        {editingPokemon === pokemon ? (
          <>
            <Button onClick={handleUpdatePokemon} variant="contained" color="primary">
              Update
            </Button>
            <Button onClick={handleCancelEdit} variant="contained" color="warning">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => handleEditPokemon(pokemon)} variant="contained" color="primary">
              Edit
            </Button>
            <Button onClick={() => handleDeletePokemon(pokemon._id)} variant="contained" color="error">
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
