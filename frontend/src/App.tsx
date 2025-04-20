/* eslint-disable */

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TickerTable from "./components/TickerTable";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme/>
      <QueryClientProvider client={queryClient}>
        <TickerTable />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
