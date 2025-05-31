import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme as darkTheme } from "./constants/themes";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import { MobileProvider } from "./hooks/MobileProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <MobileProvider>
          <RouterProvider router={router} />
        </MobileProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
