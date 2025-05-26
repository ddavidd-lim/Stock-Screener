import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TickerTable from "./components/TickerTable";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}>
          {/* Table takes remaining space */}
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <TickerTable />
          </Box>
        </Box>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
