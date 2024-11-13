import { Slot } from "~/components/slot/Slot";

export function Main({
  children,
  asChild = false,
  className = "flex flex-col flex-1 items-center",
}: {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}) {
  return (
    <Slot fallbackAs="main" id="main" className={className} asChild={asChild}>
      {children}
    </Slot>
  );
}
