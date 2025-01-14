import { BrowserWindow } from "~/components/browser-window/BrowserWindow";
import { ComponentProps, useState } from "react";
import { CopyExampleCode } from "~/components/copy-to-clipboard-button/CopyToClipboardButton";

function PlayCardRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex md:grid grid-cols-2 gap-8 flex-col">{children}</div>

    // <div className="flex md:grid grid-cols-2 flex-col sm:rounded-[12px] text-13 bg-deep-purple-950/50 backdrop-blur-md border border-white/10 overflow-hidden w-[calc(100%_+_2rem)] ml-[-1rem] md:ml-0 md:w-auto border-x-0 md:border-x">
    //   {children}
    // </div>
  );
}
import { ShikiMagicMovePrecompiled } from "./magicmove";

import { KeyedTokensInfo } from "shiki-magic-move/types";
import { Icon } from "../icon/Icon";

function PlayCode({
  steps,
  copy,
}: {
  steps: KeyedTokensInfo[]; //React.ReactNode;
  copy?: string;
}) {
  const [step, setStep] = useState<number>(0);

  function toggle() {
    if (step === 0) {
      setStep(1);
    } else {
      setStep(0);
    }
  }

  return (
    <div className=" text-13 bg-deep-purple-950/50  sm:rounded-[12px] backdrop-blur-md border border-white/10 overflow-hidden w-[calc(100%_+_2rem)] ml-[-1rem] md:ml-0 md:w-auto border-x-0 md:border-x">
      <div className="flex justify-between gap-4 px-6 pt-6">
        {copy ? <CopyExampleCode value={copy} /> : null}

        {steps.length > 1 ? (
          <button
            className=" h-8  px-3 gap-2 rounded-[7px] bg-black/20 flex items-center justify-center border border-white/15"
            onClick={toggle}
          >
            <Icon
              name={step === 0 ? "Maximize" : "Minimize"}
              className="size-4"
              alt=""
            />
            <span className="grid grid-col-1 grid-row-1">
              <span
                className="col-start-1 row-start-1 invisible data-[visible='true']:visible"
                data-visible={step === 1}
              >
                Collapse
              </span>
              <span
                className="col-start-1 row-start-1 invisible data-[visible='true']:visible"
                data-visible={step === 0}
              >
                Expand
              </span>
            </span>
            {/* <>{step === 0 ? "Expand" : "Collapse"}</> */}
          </button>
        ) : null}
      </div>

      <ShikiMagicMovePrecompiled steps={steps} step={step} />
    </div>
  );
}

function PlayPreview({
  children,
  ...props
}: { children: React.ReactNode } & ComponentProps<typeof BrowserWindow>) {
  return (
    <div className="flex flex-col items-center border-b border-white/5">
      <BrowserWindow {...props}>{children}</BrowserWindow>
    </div>
  );
}

export const PlayCard = Object.assign(PlayCardRoot, {
  Code: PlayCode,
  Preview: PlayPreview,
});
