import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="arrow-left_svg__lucide arrow-left_svg__lucide-arrow-left"
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="m12 19-7-7 7-7M19 12H5" />
  </svg>
);
export default SvgArrowLeft;
