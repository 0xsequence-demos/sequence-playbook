import { useDialogContext } from "../helpers/useDialogContext";

export const DialogContent = ({
  children,
}: {
  children: React.ReactNode | Function;
}) => {
  const { handleClose } = useDialogContext();

  if (typeof children === "function") return children({ close: handleClose });
  return <>{children}</>;
};
