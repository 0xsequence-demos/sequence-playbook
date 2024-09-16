import { ReactNode } from "react";
import BuddyBot from "../../images/bot.svg?react";
import Ground from "../../images/ground.svg?react";
import "../../images/bot.css";
import "../../images/ground.css";

type Props = {
  children: ReactNode;
  botMood: "neutral" | "happy" | "dead" | "sleeping";
  botPosture: "down" | "inviting" | "excited";
};
export const LittleWindow = (props: Props) => {
  const { botMood, botPosture, children } = props;
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
        <Ground className="ground-svg" />
        <div style={{ zIndex: 1, position: "relative" }}>{children}</div>
        <BuddyBot className={`bot-svg ${botMood} ${botPosture}`} />
      </div>
    </div>
  );
};
