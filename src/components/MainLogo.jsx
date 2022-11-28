import Grid from "@mui/material/Grid";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import { Typography } from "@mui/material";

export const MainIcon = () => {
  return (
    <>
      <Grid container spacing={0} alignItems="center" justifyContent="center">
        <QueryStatsIcon sx={{ fontSize: "100px", color: "success" }} />
      </Grid>

      <Typography variant="h3" align="center" sx={{ marginBottom: 5 }}>
        Stock-Watcher
      </Typography>
    </>
  );
};
