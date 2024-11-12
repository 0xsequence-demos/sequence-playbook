import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";

type Props = {
  botMood: "neutral" | "happy" | "dead";
};
const AnimTestRive = (props: Props) => {
  const { botMood } = props;
  const { rive, RiveComponent } = useRive({
    src: "/bot.riv",
    stateMachines: "main-sm",
    artboard: "main",
    autoplay: true,
    useOffscreenRenderer: true,
  });
  const vDead = useStateMachineInput(
    rive,
    "main-sm",
    "dead",
    botMood === "dead",
  );
  const vHappy = useStateMachineInput(
    rive,
    "main-sm",
    "happy",
    botMood === "happy",
  );

  useEffect(() => {
    if (vDead) {
      vDead.value = botMood === "dead";
    }
    if (vHappy) {
      vHappy.value = botMood === "happy";
    }
  });
  return <RiveComponent className="base-canvas-size" />;
};
export default AnimTestRive;
