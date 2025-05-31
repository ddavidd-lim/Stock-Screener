import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { MobileContext } from "./MobileContext";

export const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
};
