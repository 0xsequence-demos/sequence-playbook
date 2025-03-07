import { useActionData } from "react-router";

export function useWidgetActionData(name: string) {
  const data = useActionData();
  console.log(data?.widgets);
  if (data && data?.widgets && name) {
    return data.widgets[name];
  }

  return data?.widgets;
}
