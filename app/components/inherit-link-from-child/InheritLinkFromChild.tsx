import { ComponentProps } from "react";
import { Slot } from "~/components/slot/Slot";
export function InheritLinkFromChild(
  props: {
    children: React.ReactNode;
    asChild?: boolean;
  } & ComponentProps<"div">
) {
  const { children, asChild, ...restProps } = props;

  return (
    <Slot fallbackAs="div" data-link="inherit" asChild={asChild} {...restProps}>
      {children}
    </Slot>
  );
}
