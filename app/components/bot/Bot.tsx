import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";

type Props = {
  mood: "neutral" | "happy" | "dead";
};
export function Bot(props: Props) {
  const { mood = "neutral" } = props;

  const { rive, RiveComponent } = useRive({
    src: "/bot.riv",
    stateMachines: "main-sm",
    artboard: "main",
    autoplay: true,
    useOffscreenRenderer: true,
  });
  const vDead = useStateMachineInput(rive, "main-sm", "dead", mood === "dead");
  const vHappy = useStateMachineInput(
    rive,
    "main-sm",
    "happy",
    mood === "happy"
  );

  useEffect(() => {
    if (vDead) {
      vDead.value = mood === "dead";
    }
    if (vHappy) {
      vHappy.value = mood === "happy";
    }
  });
  return <RiveComponent className="aspect-[4/1] -mt-8" />;
}
