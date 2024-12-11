import { ReactNode } from "react";
import { Bot } from "~/components/bot/Bot";

type Props = {
  children: ReactNode;
  botMood?: "neutral" | "happy" | "dead";
};
export const BrowserWindow = ({ botMood = "neutral", children }: Props) => {
  return (
    <div className="little-window top-0 sticky">
      <div className="clouds"></div>
      <div className="clouds2"></div>
      <div className="h-[2rem] w-full border-b border-white/10 mb-[100px] p-3 items-center flex gap-1 bg-gradient-to-b from-white/[2%] to-white/5">
        <div className="size-[0.625rem] bg-gradient-to-b to-white/10 from-white/5 rounded-full border border-white/10"></div>
        <div className="size-[0.625rem] bg-gradient-to-b to-white/10 from-white/5 rounded-full border border-white/10"></div>
        <div className="size-[0.625rem] bg-gradient-to-b to-white/10 from-white/5 rounded-full border border-white/10"></div>
      </div>
      <div className="content flex-1 self-stretch">
        <div className="z-1 relative">{children}</div>
      </div>
      <Bot mood={botMood} />
    </div>
  );
};
