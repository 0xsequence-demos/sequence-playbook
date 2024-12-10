import { useLocation } from "react-router";
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
        <Vaul.Overlay className="fixed inset-0 bg-deep-purple-950/40 backdrop-blur-md" />
        <Vaul.Content className="h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="flex flex-col min-h-[30vh] bg-gradient-to-b from-deep-purple-800/75 to-deep-purple-800 rounded-t-[1rem] overflow-clip px-6 pt-8 pb-6">
            {children}
          </div>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
}
