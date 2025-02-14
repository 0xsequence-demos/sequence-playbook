import * as React from "react";
import type { SVGProps } from "react";
const SvgPencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 64 64"
    role="img"
    {...props}
  >
    <path
      fill="#fff"
      d="M33.314 1.405h-4.027a5.86 5.86 0 0 0-4.23 1.792 6.02 6.02 0 0 0-1.67 4.327l.932 40.794c.012.297.087.59.22.856l6.321 12.239c.168.35.43.648.756.858s.702.322 1.083.325a1.96 1.96 0 0 0 1.767-1.122l5.861-12.238q.075-.187.092-.388a1.5 1.5 0 0 0-.01-.408l-.562-24.599a2.1 2.1 0 0 0-.622-1.442 2.05 2.05 0 0 0-1.438-.597c-.534 0-1.04.215-1.41.597-.369.383-.569.901-.557 1.442l.513 22.437H28.3l-.652-28.556h10.067c.534 0 1.041-.215 1.41-.597.37-.383.57-.902.557-1.443l-.186-8.158a6.3 6.3 0 0 0-1.868-4.327 6.14 6.14 0 0 0-4.313-1.792m-.766 54.582-2.927-5.63h5.557zm3.06-42.344h-8.054l-.14-6.12a2 2 0 0 1 .556-1.442 1.96 1.96 0 0 1 1.41-.597h4.028c.533 0 1.05.215 1.437.597.386.383.61.902.623 1.443z"
      opacity={0.34}
    />
  </svg>
);
export default SvgPencil;
