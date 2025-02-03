import { useLocation, useNavigation } from "react-router";
import { useMemo, useState, Fragment } from "react";
import { WindowControllerContext } from "./WindowControllerContext";

const useFormPostNavigation = (setDialogMode: Function) => {
  const navigation = useNavigation();

  useMemo(() => {
    if (navigation.formMethod === "post" && navigation.state === "loading") {
      setDialogMode(false);
    }
  }, [navigation.formMethod, navigation.state]);
};

const useScrollPositionHandler = () => {
  const [scrollPosition, setScrollPositionState] = useState<number | null>(
    null,
  );

  const resetScrollPosition = () => {
    setScrollPositionState(null);
  };

  const setScrollPosition = () => {
    if (!scrollPosition) {
      setScrollPositionState(window?.scrollY || null);
    }
  };

  return { scrollPosition, setScrollPosition, resetScrollPosition };
};

export const WindowController = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const location = useLocation();
  const [isPortalMode, setPortalMode] = useState<boolean>(false);
  const [portalProps, setPortalProps] = useState<Record<string, any>>({});

  useFormPostNavigation(setPortalMode);
  const { scrollPosition, setScrollPosition, resetScrollPosition } =
    useScrollPositionHandler();

  const setWindowModeToPortal = (
    toggleTo: boolean,
    props?: Record<string, any>,
  ) => {
    setPortalMode(toggleTo);

    // If the dialog is showing, share the props with the dialog otherwise reset the props
    if (toggleTo) {
      setPortalProps(props || {});
    } else {
      setPortalProps({});
    }

    setScrollPosition();
  };

  return (
    <Fragment>
      <WindowControllerContext.Provider
        value={{
          isPortalMode,
          setWindowModeToPortal,
          portalProps,
          scrollPosition,
          resetScrollPosition,
        }}
      >
        {children}
      </WindowControllerContext.Provider>
    </Fragment>
  );
};
