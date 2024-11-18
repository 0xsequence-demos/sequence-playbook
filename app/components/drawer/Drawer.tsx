import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Drawer as Vaul } from "vaul";

export default function Drawer({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Close the drawer on navigate
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Vaul.Root open={open} onOpenChange={setOpen}>
      <Vaul.Trigger asChild>{trigger}</Vaul.Trigger>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 bg-black/40" />
        <Vaul.Content className="h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 flex flex-col min-h-[80vh] bg-black rounded-t-[1rem] border-white/20 border">
            {children}
          </div>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
}
