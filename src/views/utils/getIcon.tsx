import IconOnboard from "../../images/icons/onboard.svg?react";
import IconMonetize from "../../images/icons/monetize.svg?react";
import IconPower from "../../images/icons/power.svg?react";
import IconPlaybook from "../../images/icons/playbook.svg?react";
import { ReactNode } from "react";

export function getIcon(name: string): ReactNode {
  switch (name) {
    case "onboard":
      return IconOnboard({});
    case "monetize":
      return IconMonetize({});
    case "power":
      return IconPower({});
    case "playbook":
      return IconPlaybook({});
    default:
      return IconPlaybook({});
  }
}
