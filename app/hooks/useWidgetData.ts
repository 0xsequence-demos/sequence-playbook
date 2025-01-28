import { useMatches } from "react-router";

export function useWidgetData(name: string) {
  const data = useMatches()
    ?.filter((match) => match?.data?.widgets)
    ?.flatMap((match) => match?.data?.widgets)
    ?.filter(Boolean);

  if (name) {
    return data.find((data) => data?.[name])?.[name];
  }

  return data;
}
