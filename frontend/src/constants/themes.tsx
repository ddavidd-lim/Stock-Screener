import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#42a5f5", 
    },
    background: {
      default: "#0d1117",
      paper: "#161b22",
    },
    text: {
      primary: "#e6edf3",
      secondary: "#8b949e",
    },
    divider: "#30363d",
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0d1117",
          color: "#e6edf3",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "#161b22",
        },
        indicator: {
          backgroundColor: "#42a5f5",
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#8b949e",
          fontWeight: 500,
          "&.Mui-selected": {
            color: "#42a5f5",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "6px 14px",
          fontSize: "0.875rem",
          minWidth: 48,
          borderRadius: 8,
        },
        contained: {
          backgroundColor: "#42a5f5",
          color: "#000",
          "&:hover": {
            backgroundColor: "#1e88e5",
          },
        },
        text: {
          color: "#c9d1d9",
          "&:hover": {
            backgroundColor: "#21262d",
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#1f2733",
          boxShadow: "inset 0 0 0 1px #30363d",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#161b22",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#0d1117",
          color: "#e6edf3",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#30363d",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
          backgroundColor: "#21262d",
          color: "#e6edf3",
        },
      },
    },
  },
});
