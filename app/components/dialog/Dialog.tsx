import React from "react";
import { Portal } from "~/components/portal/Portal";

import { DialogController } from "./partials/DialogController";

import { useDialogBehaviour } from "./helpers/useDialogBehaviour";
import { DialogContextProvider } from "./helpers/useDialogContext";

export const Dialog = ({
  title,
  trigger,
  children,
}: {
  title?: string;
  redirect?: string;
  trigger?: ({
    handleOpen,
    isVisible,
  }: {
    handleOpen: () => void;
    isVisible: boolean;
  }) => Element | React.ReactNode;
  children: React.ReactNode | (() => void);
}) => {
  const { id, isVisible, handleOpen, handleClose, handleWillClose, isClosing } =
    useDialogBehaviour();

  return (
    <DialogContextProvider
      value={{
        id,
        title,
        isVisible,
        handleOpen,
        handleClose,
        handleWillClose: () => handleWillClose(301),
        isClosing,
      }}
    >
      <React.Fragment>
        {trigger ? trigger({ handleOpen, isVisible }) : null}
        <Portal>
          {isVisible && <DialogController>{children}</DialogController>}
        </Portal>
      </React.Fragment>
    </DialogContextProvider>
  );
};
