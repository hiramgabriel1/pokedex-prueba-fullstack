import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface Entrenador {
  _id: string;
  name: string;
  lastName: string;
  phoneNumber: Number;
  gymAwards: string;
}

interface EntrenadorFormProps {
  newEntrenador: {
    name: string;
    lastName: string;
    phoneNumber: Number;
    gymAwards: string;
  };
  nameError: string;
  typeError: string;
  editingPokemon: Entrenador | any;
  setNewEntrenador: React.Dispatch<
    React.SetStateAction<{
      name: string;
      lastName: string;
      phoneNumber: Number | string;
      gymAwards: string;
    }>
  >;
  handleUpdateEntrenador: () => void;
  handleAddEntrenador: () => void;
  handleCancelEdit: () => void;
}

const EntrenadorForm: React.FC<EntrenadorFormProps> = ({
  newEntrenador,
  nameError,
  typeError,
  editingPokemon,
  setNewEntrenador,
  handleUpdateEntrenador,
  handleAddEntrenador,
  handleCancelEdit,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ margin: "5px", maxWidth: "10rem" }}
          label="Nombre"
          variant="outlined"
          value={newEntrenador.name}
          onChange={(e) =>
            setNewEntrenador({ ...newEntrenador, name: e.target.value })
          }
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          sx={{ margin: "5px", maxWidth: "10rem" }}
          label="Apellido"
          variant="outlined"
          value={newEntrenador.lastName}
          onChange={(e) =>
            setNewEntrenador({ ...newEntrenador, lastName: e.target.value })
          }
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          sx={{ margin: "5px", maxWidth: "10rem" }}
          label="Numero de celular"
          variant="outlined"
          value={newEntrenador.phoneNumber}
          onChange={(e) =>
            setNewEntrenador({ ...newEntrenador, phoneNumber: e.target.value })
          }
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          sx={{ margin: "5px", maxWidth: "10rem" }}
          label="Gym Medallas"
          variant="outlined"
          value={newEntrenador.gymAwards}
          onChange={(e) =>
            setNewEntrenador({ ...newEntrenador, gymAwards: e.target.value })
          }
          error={!!typeError}
          helperText={typeError}
        />
      </Box>
      <br />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {editingPokemon ? (
          <>
            <Button
              sx={{ margin: "5px" }}
              onClick={handleUpdateEntrenador}
              variant="contained"
              color="secondary"
            >
              Actualizar
            </Button>
            <Button
              sx={{ margin: "5px" }}
              onClick={handleCancelEdit}
              variant="contained"
              color="warning"
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button
            sx={{ margin: "5px" }}
            onClick={
              editingPokemon ? handleUpdateEntrenador : handleAddEntrenador
            }
            variant="contained"
            color="warning"
          >
            {editingPokemon ? "Actualizar entrenador" : "Crear entrenador"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EntrenadorForm;
