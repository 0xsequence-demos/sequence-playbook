import { Slot } from "~/components/slot/Slot";
export function InheritLinkFromChild({
  children,
  asChild = false,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return (
    <Slot fallbackAs="div" data-link="inherit" asChild={asChild}>
      {children}
    </Slot>
  );
}
