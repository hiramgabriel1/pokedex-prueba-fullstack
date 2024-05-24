import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface Pokemon {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
}

interface PokemonFormProps {
  newPokemon: {
    name: string;
    lastName: string;
    phoneNumber: Number;
    gymAwards: string;
  };
  nameError: string;
  typeError: string;
  editingPokemon: Pokemon | null;
  setNewPokemon: React.Dispatch<
    React.SetStateAction<{
      name: string;
      lastName: string;
      phoneNumber: Number;
      gymAwards: string;
    }>
  >;
  handleUpdatePokemon: () => void;
  handleAddPokemon: () => void;
  handleCancelEdit: () => void;
}

const PokemonForm: React.FC<PokemonFormProps> = ({
  newPokemon,
  nameError,
  typeError,
  editingPokemon,
  setNewPokemon,
  handleUpdatePokemon,
  handleAddPokemon,
  handleCancelEdit,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ margin: "5px", maxWidth: "10rem" }}
          label="Name"
          variant="outlined"
          value={newPokemon.name}
          onChange={(e) =>
            setNewPokemon({ ...newPokemon, name: e.target.value })
          }
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          sx={{ margin: "5px", maxWidth: "10rem" }}
          label="Type"
          variant="outlined"
          value={newPokemon.name}
          onChange={(e) =>
            setNewPokemon({ ...newPokemon, name: e.target.value })
          }
          error={!!typeError}
          helperText={typeError}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {editingPokemon ? (
          <>
            <Button
              sx={{ margin: "5px" }}
              onClick={handleUpdatePokemon}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
            <Button
              sx={{ margin: "5px" }}
              onClick={handleCancelEdit}
              variant="contained"
              color="warning"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            sx={{ margin: "5px" }}
            onClick={editingPokemon ? handleUpdatePokemon : handleAddPokemon}
            variant="contained"
            color="primary"
          >
            {editingPokemon ? "Update Pokemon" : "Add Pokemon"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PokemonForm;

