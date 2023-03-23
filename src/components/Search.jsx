import { useState, useEffect, useContext } from "react";
import api from "../apis/api";

//mui
import { Grid, TextField, Autocomplete } from "@mui/material/";

//context
import { WatchListContext } from "../context/watchListContext";

export const Search = () => {
  //context
  const { addStock } = useContext(WatchListContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data } = await api.get("search", {
          params: {
            q: searchTerm,
          },
        });
        const results = data.result.filter(
          (stock) =>
            (stock.type === "Common Stock" || stock.type === "ETP") &&
            !stock.symbol.includes(".")
        );
        if (isMounted) {
          setSearchResults(results);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (searchTerm.length > 1 && searchTerm.length < 8) {
      fetchData();
    } else {
      setSearchResults([]);
    }

    return () => (isMounted = false);
  }, [searchTerm]);

  return (
    <Grid container spacing={0} alignItems="center" justifyContent="center">
      <Autocomplete
        sx={{ width: 500 }}
        freeSolo
        value={searchTerm}
        autoHighlight
        autoComplete
        disableClearable
        options={searchResults.map(
          (options) => `${options.description} (${options.symbol})`
        )}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Stock"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            onChange={handleSearch}
          />
        )}
        onChange={(e, v) => {
          if (v && e.keyCode === 13) {
            const symbol = v.split("(")[1].split(")")[0];
            console.log(
              symbol,
              "add stock symbol to StockList State in Watchlist"
            );
            addStock(symbol);
            setSearchTerm("");
            setSearchResults([]);
          }
        }}
      />
    </Grid>
  );
};
