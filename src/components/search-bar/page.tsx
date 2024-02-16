import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchPnr } from "@/redux/store/pnrSlice";
import { setSelectedTraveler } from "@/redux/store/selectedTraveler";
import { Autocomplete, TextField } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";

interface Traveller {
  firstName: string;
  lastName: string;
  passengerType: string;
}

const SearchBar = () => {
  const [options, setOptions] = useState<Traveller[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<Traveller | null>(null);
  const [error, setError] = useState<string | null>();

  const dispatch = useAppDispatch();
  const pnr = useAppSelector((state) => state.pnr.data);
  const isLoading = useAppSelector((state) => state.pnr.isLoading);
  const errorState = useAppSelector((state) => state.pnr.error);
  useEffect(() => {
    dispatch(fetchPnr(inputValue));

    if (errorState) {
      console.log("error", errorState);
      setError(errorState);
    } else if (pnr !== undefined && pnr.pnr !== "") {
      const parsedData = JSON.parse(pnr.travelers);
      setOptions(parsedData);
    }
  }, [dispatch, inputValue]);

  const handleSelectTraveler = (e: SyntheticEvent, newValue: Traveller | null) => {
    setValue(newValue);
    dispatch(setSelectedTraveler(newValue));
  };
  return (
    <>
      <Autocomplete
        id="autocomplete-search"
        noOptionsText="No data"
        options={options}
        getOptionLabel={(option) => option.lastName || ""}
        sx={{ width: "30rem", height: "5rem" }}
        value={value}
        onChange={handleSelectTraveler}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => {
          return <TextField {...params} label="Search by last name..." />;
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.firstName}>
              <div>
                {option.firstName} {option.lastName}
              </div>
            </li>
          );
        }}
        filterOptions={(x) => x}
      />
    </>
  );
};

export default SearchBar;
