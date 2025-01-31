import { Web3EventsWidget as BaseWidget } from "./Web3EventsWidget";
import { steps } from "./Web3EventsWidgetSnippet";
import { codeString } from "./Web3EventsWidgetString";

type WidgetType = typeof BaseWidget & {
  steps: typeof steps;
  String: typeof codeString;
};

const EnhancedWidget = Object.assign(BaseWidget, {
  steps,
  String: codeString,
}) as WidgetType;

export { EnhancedWidget as Web3EventsWidget };
