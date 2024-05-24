import React from "react";
import { Box, TextField, Pagination } from "@mui/material";

interface PokemonFormProps {
  query: string;
  nameError: string;
  totalPages: number;
  currentPage: number;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}

const PokemonForm: React.FC<PokemonFormProps> = ({
  query,
  nameError,
  totalPages,
  currentPage,
  handleTextChange,
  handlePageChange,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", margin: "1rem" }}>
      <div></div>
      <div></div>
      <TextField
        sx={{ margin: "5px" }}
        label="Busqueda"
        variant="outlined"
        value={query}
        onChange={handleTextChange}
        error={!!nameError}
        helperText={nameError}
      />
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default PokemonForm;