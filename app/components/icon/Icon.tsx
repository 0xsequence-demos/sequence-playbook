import { type SVGProps } from "react";
import type { IconName } from "./names";

export function Icon({
  name,

  width = undefined,
  height = undefined,
  alt = undefined,
  className = "",
  preserveAspectRatio = "xMinYMin",

  ...props
}: SVGProps<SVGSVGElement> & {
  alt?: string;

  name: IconName | string;
}) {

  return (
    <svg
      {...{
        preserveAspectRatio,
        "aria-hidden": !alt ? true : undefined,
        role: alt ? "img" : "presentation",
        title: alt,
        "aria-label": alt || undefined,
        width,
        height,
        focusable: "false",
        className: `${className} flex-shrink-0`.trim(),
        // style,
      }}
      {...props}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
