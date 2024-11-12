import { ReactNode } from "react";
import { Bot } from "../bot/Bot";

type Props = {
  children: ReactNode;
  botMood: "neutral" | "happy" | "dead";
};
export const BrowserWindow = (props: Props) => {
  const { botMood, children } = props;
  return (
    <div className="little-window">
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
      {/* <Bot mood={botMood} /> */}
    </div>
  );
};
