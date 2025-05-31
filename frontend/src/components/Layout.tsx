import { Box } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "100vw",
      }}>
      <Header />
      <Outlet />
    </Box>
  );
}
