import { Slot } from "~/components/slot/Slot";

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  appearance?: string | false;
}

export function Main({
  children,
  asChild = false,
  className = "",
  appearance = false,
  ...props
}: Props) {
  if (!appearance) {
    className = `flex flex-col flex-1 items-center ${className}`;
  }

  return (
    <Slot
      fallbackAs="main"
      id="main"
      className={className}
      asChild={asChild}
      tabIndex={-1}
      {...props}
    >
      {children}
    </Slot>
  );
}
