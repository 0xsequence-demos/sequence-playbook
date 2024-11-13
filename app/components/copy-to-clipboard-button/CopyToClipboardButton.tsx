import { useState } from "react";
import { Slot } from "~/components/slot/Slot";
import { toast } from "sonner";
export function CopyToClipboardButton({
  children,
  value,
  className = "",
  asChild,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
  asChild?: boolean;
}) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      toast("Failed to copy");
    }
  };

  return (
    <>
      <Slot
        asChild={asChild}
        fallbackAs="button"
        className={className}
        onClick={() => copyToClipboard(value)}
      >
        {children}
      </Slot>
    </>
  );
}
