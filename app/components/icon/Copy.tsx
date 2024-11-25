import * as React from "react";
import type { SVGProps } from "react";
const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="copy_svg__lucide copy_svg__lucide-copy"
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);
export default SvgCopy;
