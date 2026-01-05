import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        textAlign: "center",
        px: 2,
      }}>
      <Box>
        <Typography variant="h1" fontWeight={700} gutterBottom>
          404
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          Oops — the page you’re looking for doesn’t exist.
        </Typography>

        <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    </Box>
  );
}
