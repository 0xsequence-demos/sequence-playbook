import { createContext, useContext } from "react";

interface DialogContextProps {
  id: string;
  isVisible: boolean;
  isClosing: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleWillClose: () => void;
  title?: string;
}

const DialogContext = createContext<DialogContextProps | null>(null);

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Modal context not found");
  return context;
};

export function DialogContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DialogContextProps;
}) {
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}
