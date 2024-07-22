import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ title, search, handleChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="outlined-adornment-search">
        Search {title}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-search"
        type="text"
        startAdornment={
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label={`Search ${title}`}
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default SearchBox;
