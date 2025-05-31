import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        height: "73px",
        borderBottom: "1px solid #ccc", 
        display: "flex",
        alignItems: "center", 
        width: "100%",
        px: 2
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Stock Screener
      </Typography>
    </Box>
  );
}