import { ReactNode } from "react";
import BuddyBot from "../../images/bot.svg?react";
import "../../images/bot.css";

type Props = {
  children: ReactNode;
};
export const LittleWindow = (props: Props) => {
  const { children } = props;
  return (
    <div className="little-window">
      <div className="header">
        <div className="decor-tl">
          <span className="dot" />
          <span className="dash" />
        </div>
      </div>
      <div className="content">
        {children}
        <br />
        <BuddyBot className="bot-svg" />
      </div>
    </div>
  );
};
