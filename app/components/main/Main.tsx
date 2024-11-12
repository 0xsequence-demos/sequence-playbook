import { Slot } from "~/components/slot/Slot";

export function Main({
  children,
  className = "flex flex-col flex-1 items-center",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Slot fallbackAs="main" id="main" className={className}>
      {children}
    </Slot>
  );
}
