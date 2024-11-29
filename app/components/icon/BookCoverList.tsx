import * as React from "react";
import type { SVGProps } from "react";
const SvgBookCoverList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 160 160"
    role="img"
    {...props}
  >
    <g
      fill="#fff"
      fillRule="evenodd"
      clipPath="url(#book-cover-list_svg__a)"
      clipRule="evenodd"
    >
      <path d="m41.59 65.06 19.612-5.11 5.255 19.073-19.612 5.111zm6.728 3.778 2.411 8.753 9-2.345-2.411-8.754zm19.13-8.387 19.612-5.11 1.422 5.16-19.612 5.11zm2.738 9.939 19.612-5.111 1.422 5.16-19.612 5.111zM48.367 89.658l19.611-5.11 5.255 19.074-19.611 5.11zm6.727 3.778 2.412 8.753 9-2.345-2.412-8.754zm19.13-8.387 19.613-5.11 1.421 5.16-19.611 5.11zm2.74 9.94 19.61-5.112 1.422 5.16-19.611 5.112z" />
    </g>
    <defs>
      <clipPath id="book-cover-list_svg__a">
        <path
          fill="#fff"
          d="m34.013 60.95 56.595-14.748 15.164 55.044-56.594 14.749z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBookCoverList;
