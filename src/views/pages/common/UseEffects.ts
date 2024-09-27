import { useEffect } from "react";
import { slugify } from "../../utils/slugify";
import { CommonPageProps } from "./Props";

export function useCommonPageEffects(props: CommonPageProps) {
  const { label, setCurrentPageName, description, setCurrentPageDescription } =
    props;
  useEffect(() => {
    setCurrentPageName(slugify(label));
  });
  useEffect(() => {
    setCurrentPageDescription(description);
  });
}
