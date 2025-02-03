import { FocusScope } from "react-aria";
import { Backdrop } from "./Backdrop";
import { useDialogContext } from "../helpers/useDialogContext";

export const DialogController = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { handleWillClose } = useDialogContext();

  const tryClosingDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e && e.target !== e.currentTarget) {
      return;
    }
    handleWillClose();
  };

  return (
    <>
      <Backdrop />
      <FocusScope contain restoreFocus autoFocus>
        <div
          className="w-full min-h-full absolute flex items-end md:items-center justify-center overflow-clip"
          onClick={tryClosingDialog}
        >
          {children}
        </div>
      </FocusScope>
    </>
  );
};
