import { useEffect, useState } from "react";
import { useDialogContext } from "./useDialogContext";

export function useDialogEnterExit() {
  const { isClosing, isVisible } = useDialogContext();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const makeVisible = setTimeout(() => setVisible((v) => !v), 1);
    return () => clearTimeout(makeVisible);
  }, [isVisible, isClosing]);

  return visible;
}
