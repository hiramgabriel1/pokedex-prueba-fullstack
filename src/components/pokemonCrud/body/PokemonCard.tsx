import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  ListItemText,
} from "@mui/material";

interface Entrenador {
  _id: string;
  name: string;
  lastName: string;
  phoneNumber: number;
  gymAwards: string;
}

interface PokemonCardProps {
  entrenador: Entrenador; 
  editingEntrenador: Entrenador | null;
  handleUpdateEntrenador: () => void;
  handleCancelEdit: () => void;
  handleEditEntrenador: (entrenador: Entrenador) => void;
  handleDeleteEntrenador: (id: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  entrenador,
  editingEntrenador,
  handleUpdateEntrenador,
  handleCancelEdit,
  handleEditEntrenador,
  handleDeleteEntrenador,
}) => {
  const isEditing = editingEntrenador?._id === entrenador._id;

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
        backgroundColor: isEditing ? "#E3F2FD" : "#F3F3F3",
        minWidth: "150px",
      }}
    >
      <CardContent>
        <ListItemText
          sx={{ textTransform: "capitalize" }}
          primary={`Name: ${entrenador.name}`}
        />
        <ListItemText
          sx={{ textTransform: "capitalize" }}
          primary={`Lastname: ${entrenador.lastName}`}
        />
        <ListItemText
          sx={{ textTransform: "capitalize" }}
          primary={`Phone Number: ${entrenador.phoneNumber}`}
        />
        <ListItemText
          sx={{ textTransform: "capitalize" }}
          primary={`Gym Awards: ${entrenador.gymAwards}`}
        />
      </CardContent>
      <CardActions>
        {isEditing ? (
          <>
            <Button
              onClick={handleUpdateEntrenador}
              variant="contained"
              color="primary"
            >
              Actualizar
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="contained"
              color="warning"
            >
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => handleEditEntrenador(entrenador)}
              variant="contained"
              color="primary"
            >
              Editar
            </Button>
            <Button
              onClick={() => handleDeleteEntrenador(entrenador._id)}
              variant="contained"
              color="error"
            >
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
