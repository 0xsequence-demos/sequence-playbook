import { Slot } from "~/components/slot/Slot";
import { toast } from "sonner";
import { Icon } from "~/components/icon/Icon";
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

export function CopyExampleCode({ value }: { value: string }) {
  return (
    <CopyToClipboardButton value={value} asChild>
      <button className=" h-8  px-3 gap-2 rounded-[7px] bg-black/20 flex items-center justify-center border border-white/15">
        <Icon name="copy" className="size-4" alt="Copy code to clipboard" />
        Copy
      </button>
    </CopyToClipboardButton>
  );
}
