import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, ListItem, CircularProgress, Typography } from "@mui/material";

import PokemonCard from "./body/PokemonCard";
import PokemonForm from "./body/PokemonForm";
import Swal from "sweetalert2";

const API_URL = "http://localhost:5000/api/v1/my-pokemons";

interface Entrenador {
  _id: string;
  name: string;
  lastName: string;
  phoneNumber: Number;
  gymAwards: string;
}

function PokemonBody() {
  const [entrenadores, setEntrenador] = useState<Entrenador[]>([]);
  const [newEntrenador, setNewEntrenador] = useState({
    name: "",
    lastName: "",
    phoneNumber: 0,
    gymAwards: "",
  });
  const [editingPokemon, setEditingPokemon] = useState<Entrenador | null>(null);
  const [nameError, setNameError] = useState<string>("");
  const [typeError, setTypeError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingOperation, setLoadingOperation] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setEntrenador(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = (): boolean => {
    let isValid = true;

    const validateField = (
      value: string,
      fieldName: string,
      minLength: number,
      maxLength: number
    ) => {
      if (
        value.trim().length < minLength ||
        value.trim().length > maxLength ||
        !/^[a-zA-Z\s-]+$/.test(value.trim())
      ) {
        if (fieldName === "name")
          setNameError(
            `Name must be between ${minLength} and ${maxLength} characters and contain only letters, spaces, or hyphens`
          );
        setTypeError(
          `Type must not exceed ${maxLength} characters and contain only letters, spaces, or hyphens`
        );

        isValid = false;
      } else {
        if (fieldName === "name") setNameError("");

        setTypeError("");
      }
    };

    validateField(newEntrenador.name, "name", 3, 19);
    validateField(newEntrenador.lastName, "lastName", 0, 30);

    return isValid;
  };

  const handleAddPokemon = async () => {
    if (validateInputs()) {
      try {
        setLoadingOperation(true);
        const response = await axios.post(
          "http://localhost:5000/api/v1/add-pokemon",
          newEntrenador
        );
        if (response) {
          if (response.status === 204) {
            Swal.fire({
              icon: "error",
              title: "entrenador ya existe",
            });
            return;
          }
          // @ts-expect-error
          setNewPokemon({
            name: "",
            lastName: "",
            phoneNumber: 0,
            gymAwards: " ",
          });

          fetchData();
        }
      } catch (error) {
        console.error("Error adding pokemon:", error);
      } finally {
        setLoadingOperation(false);
      }
    }
  };

  const handleEditPokemon = (entrenador: Entrenador) => {
    setEditingPokemon(entrenador);
    setNewEntrenador({
      name: entrenador.name,
      lastName: entrenador.lastName,
      // @ts-ignore
      phoneNumber: entrenador.phoneNumber,
      gymAwards: entrenador.gymAwards,
    });
  };

  const handleCancelEdit = () => {
    setEditingPokemon(null);
    // setEntrenador({ name: "", lastName: "", phoneNumber: "", gymAwards: "" });
  };

  const handleUpdatePokemon = async () => {
    if (validateInputs() && editingPokemon) {
      setLoadingOperation(true);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/v1/update-pokemon/${editingPokemon._id}`,
          newEntrenador
        );
        fetchData()

        if (response) {
          if (response.status === 204) {
            Swal.fire({
              icon: "error",
              title: "entrenador ya existe",
            });
            return;
          } else {
            setEditingPokemon(null);
            // @ts-expect-error
            setNewPokemon({ name: "", lastName: "" });
            fetchData();
          }
        }
      } catch (error) {
        console.error("Error updating pokemon:", error);
      } finally {
        setLoadingOperation(false);
      }
    }
  };

  const handleDeletePokemon = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/delete-pokemon/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting pokemon:", error);
    }
  };
  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "34px",
          margin: { xs: "0", md: "1rem 0 1rem 0" },
        }}
      >
        Entrenadores CRUD
      </Typography>
      <PokemonForm
        newEntrenador={newEntrenador}
        nameError={nameError}
        typeError={typeError}
        editingEntrenador={editingPokemon}
        // @ts-expect-error
        setNewEntrenador={setNewEntrenador}
        handleUpdateEntrenador={handleUpdatePokemon}
        handleAddEntrenador={handleAddPokemon}
        handleCancelEdit={handleCancelEdit}
      />
      {loading || loadingOperation ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : entrenadores?.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(178px, 1fr))",
            gap: "15px",
            width: "100%",
          }}
        >
          {entrenadores.map((entrenador) => (
            <ListItem key={entrenador._id}>
              <PokemonCard
                // @ts-ignore
                entrenador={entrenador}
                // @ts-ignore
                editingEntrenador={editingPokemon}
                handleUpdateEntrenador={handleUpdatePokemon}
                handleCancelEdit={handleCancelEdit}
                handleEditEntrenador={handleEditPokemon}
                handleDeleteEntrenador={handleDeletePokemon}
              />
            </ListItem>
          ))}
        </Box>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No hay entrenadores en la lista.
        </p>
      )}
    </>
  );
}

export default PokemonBody;
