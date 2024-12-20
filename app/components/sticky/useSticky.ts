import { createRef, useEffect, useRef, useState } from "react";
import { Slot } from "~/components/slot/Slot";

type StickyProps = {
  position?: "top" | "bottom" | "left" | "right";
  stuckClasses?: string;
  unstuckClasses?: string;
  stuckStyles?: React.CSSProperties;
  unstuckStyles?: React.CSSProperties;
  asChild?: boolean;
};

// https://mtm.dev/sticky-stuck-styles
export function useSticky() {
  const [stuck, setStuck] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(
      ([e]) => {
        setStuck(e.intersectionRatio < 1);
      },
      { threshold: [1] }
    );
    if (cachedRef) {
      observer.observe(cachedRef);
    }
    return () => (cachedRef ? observer.unobserve(cachedRef) : undefined);
  }, [ref]);

  return [ref, stuck] as [React.RefObject<HTMLDivElement>, boolean];
}
