import { useDialogEnterExit } from "../helpers/useDialogEnterExit";
import { useDialogContext } from "../helpers/useDialogContext";

export const DialogWindow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { id } = useDialogContext();

  const visible = useDialogEnterExit();

  return (
    <div
      className={`Dialog ${visible ? "open" : ""} ${className}`}
      role="dialog"
      aria-modal="true"
      aria-describedby={id}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};
