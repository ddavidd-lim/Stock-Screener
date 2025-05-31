import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
        },
        indicator: {
          backgroundColor: "#66bb6a",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#66bb6a",
          "&.Mui-selected": {
            color: "#66bb6a", 
          },
        },
      },
    },
  },
});
