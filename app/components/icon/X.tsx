import * as React from "react";
import type { SVGProps } from "react";
const SvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
export default SvgX;
