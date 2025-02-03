import { useState } from "react";
import { createPortal } from "react-dom";
import { useIsomorphicLayoutEffect } from "~/hooks/useIsomorphicLayoutEffect";

export const Portal = ({
  children,
  nodeId = "windowPortal",
}: {
  children?: React.ReactNode;
  nodeId?: string;
}) => {
  const [$portal, setPortal] = useState<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    setPortal(document.getElementById(nodeId));

    return () => {
      // const $node = document.getElementById(nodeId)
      // if ($node) $node.innerHTML = ""
    };
  }, [nodeId, setPortal]);

  return $portal ? createPortal(children, $portal) : null;
};
