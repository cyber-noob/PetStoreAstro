import { Button, Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <TextField
        id="search"
        type="search"
        label="Your next cuddly companion awaits...."
        value={searchTerm}
        onChange={handleChange}
        sx={{
          width: "100%",
          boxShadow: "0 6px 10px -10px #000000",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={React.cloneElement(<SearchIcon />)}
              >
                Search
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}
