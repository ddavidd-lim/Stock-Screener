import { createContext, useContext } from "react";

export const MobileContext = createContext(false);

export const useIsMobile = () => {
  const isMobile = useContext(MobileContext);
  return isMobile;
};
