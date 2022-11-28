import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../apis/api";

//mui
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

//context
import { WatchListContext } from "../context/watchListContext";

export const Watchlist = () => {
  //context
  const { stockList, removeStock } = useContext(WatchListContext);
  const [stock, setStock] = useState([]);
  //navigate
  const navigate = useNavigate();

  // custom function to handle double click DataGrid Rows
  const handleDoubleClickStock = (symbol) => {
    navigate(`detail/${symbol}`);
  };
  // data fetch on mount & stockList updates
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await Promise.all(
          stockList.map(async (symbol) => {
            const { data } = await api.get("quote", {
              params: {
                symbol: symbol,
              },
            });

            return { symbol, ...data };
          })
        );
        // console.log(res);
        if (isMounted) {
          setStock(res);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    return () => (isMounted = false);
  }, [stockList]);

  // datagrid column defintion
  const columns = [
    {
      field: "symbol",
      headerName: "Symbol",
      renderCell: (params) => (
        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Avatar
              alt={`${params.value}-logo`}
              src={`https://financialmodelingprep.com/image-stock/${params.value}.jpg`}
              sx={{ width: 25, height: 25 }}
            />
          </Grid>
          <Grid item xs={4}>
            <strong>{params.value}</strong>
          </Grid>
        </Grid>
      ),
    },
    {
      field: "c",
      headerName: "Current",
      type: "number",
      renderCell: (cellValues) => cellValues.value.toFixed(2),
    },
    {
      field: "d",
      headerName: "Chg",
      type: "number",
      renderCell: (cellValues) => {
        return cellValues.value > 0 ? (
          <Grid
            container
            spacing={1}
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ color: "success.main" }}
          >
            <Grid item xs={3}>
              <ArrowDropUpIcon />
            </Grid>

            <Grid item xs={3}>
              {cellValues.value.toFixed(2)}
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            spacing={1}
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ color: "error.main" }}
          >
            <Grid item xs={3}>
              <ArrowDropDownIcon />
            </Grid>

            <Grid item xs={3}>
              {cellValues.value.toFixed(2)}
            </Grid>
          </Grid>
        );
      },
    },
    {
      field: "dp",
      headerName: "Chg%",
      type: "number",
      renderCell: (cellValues) => {
        return cellValues.value > 0 ? (
          <Grid
            container
            spacing={1}
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ color: "success.main" }}
          >
            <Grid item xs={3}>
              <ArrowDropUpIcon />
            </Grid>

            <Grid item xs={3}>
              {cellValues.value.toFixed(2)}
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            spacing={1}
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ color: "error.main" }}
          >
            <Grid item xs={3}>
              <ArrowDropDownIcon />
            </Grid>

            <Grid item xs={3}>
              {cellValues.value.toFixed(2)}
            </Grid>
          </Grid>
        );
      },
    },
    {
      field: "h",
      headerName: "High",
      type: "number",
    },
    {
      field: "l",
      headerName: "Low",
      type: "number",
    },
    {
      field: "o",
      headerName: "Open",
      type: "number",
    },
    {
      field: "pc",
      headerName: "Pclose",
      type: "number",
    },
    {
      field: " ",
      width: 50,
      description: "Remove stock from watchlist",
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={`Remove ${params.row.symbol}`}>
          <IconButton
            size="small"
            aria-label="delete"
            color="error"
            onClick={() => removeStock(params.row.symbol)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h3" align="center" sx={{ my: 5 }}>
        WatchList
      </Typography>
      <Container maxWidth="md">
        <DataGrid
          autoHeight
          disableColumnMenu
          disableSelectionOnClick
          onRowDoubleClick={(params) => {
            handleDoubleClickStock(params.id);
          }}
          rows={stock}
          columns={columns}
          getRowId={(row) => row.symbol}
          hideFooter
        />
      </Container>
    </div>
  );
};
