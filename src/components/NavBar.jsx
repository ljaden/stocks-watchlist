import { useParams } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
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
