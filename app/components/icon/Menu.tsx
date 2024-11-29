import * as React from "react";
import type { SVGProps } from "react";
const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="menu_svg__lucide menu_svg__lucide-menu"
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M4 12h16M4 6h16M4 18h16" />
  </svg>
);
export default SvgMenu;
