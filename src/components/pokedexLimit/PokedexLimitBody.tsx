import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

import { PokedexAPI } from "../../globalVariables";
import PokemonCard from "./body/PokemonCard";
import PokemonForm from "../common/PokemonForm";

interface Pokemon {
  name: string;
  imageUrl: string;
  type: string;
  abilities: string;
  id: number;
}

const API_URL = PokedexAPI;

function PokedexLimitBody() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false); 

  const limit = 18;

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}?page=${(currentPage - 1) * limit}&limit=${limit}${
          query ? `&search=${query}` : ""
        }`
      );
      setPokemons(response.data.results);
      if (response.status === 204) {
        setErrorMessage("Non-pageable page.");
      } else {
        setTotalPages((prevTotalPages) =>
          Math.ceil(response.data.count / limit)
        );
        setErrorMessage(""); // Clear the error message when data is successfully fetched
      }
    } catch (error) {
      setErrorMessage("No pokemons found.");
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, query, setPokemons, setTotalPages, setErrorMessage]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPokemons();
    };
    fetchData();
  }, [currentPage, fetchPokemons]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (text.length < 18) {
      setQuery(event.target.value);
      setNameError("");
      setCurrentPage(1);
    } else {
      setNameError("Pokemon name must contain fewer than 18 letters");
    }
  };

  return (
    <div>
      <PokemonForm
        query={query}
        nameError={nameError}
        totalPages={totalPages}
        currentPage={currentPage}
        handleTextChange={handleTextChange}
        handlePageChange={handlePageChange}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(178px, 1fr))",
          gap: "16px",
          width: "100%",
          justifyItems: "center",
          position: "relative",
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.7)",
              zIndex: 1,
            }}
          >
            <CircularProgress color="primary" />
          </div>
        )}
        {pokemons?.length > 0 ? (
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <Typography sx={{ marginTop: "20px" }}>{errorMessage}</Typography>
        )}
      </Box>
    </div>
  );
}

export default PokedexLimitBody;