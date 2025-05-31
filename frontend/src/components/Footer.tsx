import { Box, Typography } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      sx={{
        height: "73px",
        borderTop: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        px: 2,
      }}>
      <Typography variant="subtitle2">
        ©{currentYear}
      </Typography>
    </Box>
  );
}
