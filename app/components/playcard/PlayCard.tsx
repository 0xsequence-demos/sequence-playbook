import { BrowserWindow } from "~/components/browser-window/BrowserWindow";
import { ComponentProps } from "react";
import { CopyExampleCode } from "~/components/copy-to-clipboard-button/CopyToClipboardButton";

function PlayCardRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:rounded-[12px] text-13 bg-deep-purple-950 border border-white/10 overflow-hidden w-[calc(100%_+_2rem)] ml-[-1rem] md:ml-0 md:w-auto border-x-0 md:border-x">
      {children}
    </div>
  );
}

function PlayCode({
  children,
  copy,
}: {
  children: React.ReactNode;
  copy?: string;
}) {
  return (
    <div>
      {copy ? (
        <div className="px-6 pt-6">
          <CopyExampleCode value={copy} />
        </div>
      ) : null}
      {children}
    </div>
  );
}

function PlayPreview({
  children,
  ...props
}: { children: React.ReactNode } & ComponentProps<typeof BrowserWindow>) {
  return (
    <div className="flex flex-col items-center p-4 md:p-8 bg-gradient-to-b from-white/[4%] to-white/[2%] border-b border-white/5">
      <BrowserWindow {...props}>{children}</BrowserWindow>
    </div>
  );
}

export const PlayCard = Object.assign(PlayCardRoot, {
  Code: PlayCode,
  Preview: PlayPreview,
});
