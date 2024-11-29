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
      <div className="header">
        <div className="decor-tl">
          <span className="dot" />
          <span className="dash" />
        </div>
      </div>
      <div className="content">
        <div className="z-1 relative">{children}</div>
      </div>
      <Bot mood={botMood} />
    </div>
  );
};
