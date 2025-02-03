import { useLocation } from "react-router-dom";
import { useEffect, useId, useState } from "react";

import { handleKeyUpEvent } from "./handleKeyUpEvent";
import { useWindowControllerContext } from "~/components/window-controller/WindowControllerContext";

export const useDialogBehaviour = () => {
  const id = useId();

  const { setWindowModeToPortal } = useWindowControllerContext();
  const [isVisible, setVisible] = useState(false);

  const handleOpen = () => {
    setWindowModeToPortal(true); // Sets the outlet context of browser to dialog mode - disabling the main content
    setVisible(true);
  };

  const handleClose = () => {
    setWindowModeToPortal(false);
    setVisible(false);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    handleKeyUpEvent("Escape", handleWillClose, e);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => window.removeEventListener("keyup", handleKeyPress);
  });

  const location = useLocation();

  // Close the window on location change.
  useEffect(() => {
    handleClose();
  }, [location.pathname]);

  const [willClose, setWillClose] = useState<number | false>(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsClosing(true);
    const timeWillClose = setTimeout(() => {
      handleClose();
      setIsClosing(false);
      setWillClose(false);
    }, willClose || 0);
    return () => clearTimeout(timeWillClose);
  }, [willClose]);

  function handleWillClose(duration: number) {
    setWillClose(duration);
  }

  return { id, isVisible, handleOpen, handleClose, isClosing, handleWillClose };
};
