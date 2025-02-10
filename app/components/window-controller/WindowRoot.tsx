import { Outlet } from "react-router";
import { useRef } from "react";
import { useWindowControllerContext } from "./WindowControllerContext";
import { useIsomorphicLayoutEffect } from "~/hooks/useIsomorphicLayoutEffect";

const useInertableWindow = () => {
  const { isPortalMode, scrollPosition, resetScrollPosition } =
    useWindowControllerContext();

  const ref = useRef<HTMLDivElement>(null);

  // Determine if the root window frame should be disabled or enabled, and then disable or enable it using css stylig
  useIsomorphicLayoutEffect(() => {
    if (isPortalMode && ref.current && scrollPosition) {
      ref.current.style.marginTop = -scrollPosition + "px";
    }

    if (!isPortalMode && ref.current && scrollPosition && window) {
      ref.current.style.marginTop = "";
      window.scrollTo({ top: scrollPosition, left: 0, behavior: "auto" });
      resetScrollPosition();
    }
  }, [isPortalMode]);

  return ref;
};

export const WindowRoot = ({
  name = "windowRoot",
  children,
}: {
  name?: string;
  children?: React.ReactNode;
}) => {
  const { isPortalMode } = useWindowControllerContext();

  const ref = useInertableWindow();
  const classList = isPortalMode
    ? "fixed w-full overflow-clip"
    : "min-h-full flex flex-col flex-1";

  return (
    <div
      id={name}
      ref={ref}
      className={classList}
      aria-hidden={isPortalMode ? "true" : undefined}
      /**@ts-expect-error inert attribute */
      inert={isPortalMode ? "" : undefined}
    >
      {children ? children : <Outlet />}
    </div>
  );
};
