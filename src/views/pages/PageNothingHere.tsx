import { CommonPageProps } from "./common/Props";
import { useCommonPageEffects } from "./common/UseEffects";

export const PageNothingHere = (props: CommonPageProps) => {
  useCommonPageEffects(props);
  return null;
};
