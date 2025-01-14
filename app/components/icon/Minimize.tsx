import * as React from "react";
import type { SVGProps } from "react";
const SvgMinimize = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="minimize_svg__lucide minimize_svg__lucide-minimize-2"
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M4 14h6v6m10-10h-6V4m0 6 7-7M3 21l7-7" />
  </svg>
);
export default SvgMinimize;
