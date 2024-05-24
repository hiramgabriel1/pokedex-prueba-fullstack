import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, ListItem, CircularProgress, Typography } from "@mui/material";

import PokemonCard from "./body/PokemonCard";
import PokemonForm from "./body/PokemonForm";

const API_URL = "http://localhost:5000/api/v1/my-pokemons";

interface Pokemon {
  _id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  gymAwards: string
}

function PokemonBody() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [newPokemon, setNewPokemon] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    gymAwards: "",
  });
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);
  const [nameError, setNameError] = useState<string>("");
  const [typeError, setTypeError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingOperation, setLoadingOperation] = useState(false); // New state for specific operations

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPokemons(response.data);
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
        if (fieldName === "name") {
          setNameError(
            `Name must be between ${minLength} and ${maxLength} characters and contain only letters, spaces, or hyphens`
          );
        } else {
          setTypeError(
            `Type must not exceed ${maxLength} characters and contain only letters, spaces, or hyphens`
          );
        }
        isValid = false;
      } else {
        if (fieldName === "name") {
          setNameError("");
        } else {
          setTypeError("");
        }
      }
    };

    validateField(newPokemon.name, "name", 3, 19);
    validateField(newPokemon.lastName, "lastName", 0, 30);

    return isValid;
  };

  const handleAddPokemon = async () => {
    if (validateInputs()) {
      try {
        setLoadingOperation(true); // Set loading for the specific operation
        const response = await axios.post(
          "http://localhost:5000/api/v1/add-pokemon",
          newPokemon
        );
        if (response) {
          if (response.status === 204) {
            alert("Pokemon duplicate");
          } else {
              // @ts-expect-error
            setNewPokemon({ name: "", lastName: "" });
            fetchData();
          }
        }
      } catch (error) {
        console.error("Error adding pokemon:", error);
      } finally {
        setLoadingOperation(false); // Reset loading after the operation
      }
    }
  };

  const handleEditPokemon = (pokemon: Pokemon) => {
    setEditingPokemon(pokemon);
    // @ts-expect-error
    setNewPokemon({ name: pokemon.name, lastName: pokemon.lastName});
  };

  const handleCancelEdit = () => {
    setEditingPokemon(null);
    // @ts-expect-error
    setNewPokemon({ name: "", lastName: "" });
  };

  const handleUpdatePokemon = async () => {
    if (validateInputs() && editingPokemon) {
      setLoadingOperation(true);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/v1/update-pokemon/${editingPokemon._id}`,
          newPokemon
        );
        if (response) {
          if (response.status === 204) {
            alert("Pokemon duplicate");
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
          fontSize: "24px",
          margin: { xs: "0", md: "1rem 0 1rem 0" },
        }}
      >
        Pokemon CRUD
      </Typography>
      <PokemonForm
  // @ts-expect-error
newPokemon={newPokemon}
        nameError={nameError}
        typeError={typeError}
        // @ts-expect-error
        editingPokemon={editingPokemon}
        // @ts-expect-error
        setNewPokemon={setNewPokemon}
        handleUpdatePokemon={handleUpdatePokemon}
        handleAddPokemon={handleAddPokemon}
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
      ) : pokemons?.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(178px, 1fr))",
            gap: "15px",
            width: "100%",
          }}
        >
          {pokemons.map((pokemon) => (
            <ListItem key={pokemon._id}>
              <PokemonCard
              // @ts-expect-error
                pokemon={pokemon}
              // @ts-expect-error
                editingPokemon={editingPokemon}
                handleUpdatePokemon={handleUpdatePokemon}
                handleCancelEdit={handleCancelEdit}
              // @ts-expect-error

                handleEditPokemon={handleEditPokemon}
                handleDeletePokemon={handleDeletePokemon}
              />
            </ListItem>
          ))}
        </Box>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No pokemons found.
        </p>
      )}
    </>
  );
}

export default PokemonBody;
