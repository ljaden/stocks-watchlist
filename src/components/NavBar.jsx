import { useParams } from "react-router-dom";

import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function ButtonAppBar() {
  const { symbol } = useParams();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            href="/stocks-watchlist/"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <HomeOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {symbol ?? "Dashboard"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
