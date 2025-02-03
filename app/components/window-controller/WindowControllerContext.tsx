import { createContext, useContext } from "react";

type WindowControllerContextProps = {
  scrollPosition: number | null;
  isPortalMode: boolean;
  setWindowModeToPortal: (value: boolean, props?: Record<string, any>) => void;
  portalProps: any;
  resetScrollPosition: () => void;
};

export const WindowControllerContext =
  createContext<WindowControllerContextProps | null>(null);

export const useWindowControllerContext = () => {
  const context = useContext(WindowControllerContext);

  if (!context) {
    throw new Error(
      "useWindowControllerContext must be used within a WindowControllerContextProvider"
    );
  }
  return context;
};
