import { ReactNode } from "react";
import AnimTestRive from "./animations/bot/AnimTestRive";

type Props = {
  children: ReactNode;
  botMood: "neutral" | "happy" | "dead";
};
export const LittleWindow = (props: Props) => {
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
        <div style={{ zIndex: 1, position: "relative" }}>{children}</div>
      </div>
      <AnimTestRive botMood={botMood} />
    </div>
  );
};
