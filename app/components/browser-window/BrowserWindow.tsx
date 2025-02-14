import { ReactNode } from "react";
import { Bot } from "~/components/bot/Bot";

type Props = {
  children: ReactNode;
  botMood?: "neutral" | "happy" | "dead";
};
export const BrowserWindow = ({ botMood = "neutral", children }: Props) => {
  return (
    <div className="browser-window top-[5rem] sticky bg-deep-purple-800  shadow-2xl shadow-deep-purple-900 max-w-[40rem] w-full text-center items-center justify-center overflow-hidden rounded-[0.75rem] ">
      <div className="clouds"></div>
      <div className="clouds2"></div>
      <div className="h-4 md:h-[2rem] w-full mb-[100px] p-3 items-center flex gap-1 bg-gradient-to-b to-white/[0%] from-white/10">
        <div className="size-[0.625rem] bg-gradient-to-b to-white/10 from-white/5 rounded-full "></div>
        <div className="size-[0.625rem] bg-gradient-to-b to-white/10 from-white/5 rounded-full "></div>
        <div className="size-[0.625rem] bg-gradient-to-b to-white/10 from-white/5 rounded-full "></div>
      </div>
      <div className="flex-1 flex-col flex items-center self-stretch z-1 relative">
        {children}
      </div>
      <Bot mood={botMood} />
    </div>
  );
};
