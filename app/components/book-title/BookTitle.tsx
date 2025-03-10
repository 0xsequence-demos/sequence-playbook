import { Link } from "react-router";

import { BookInfo, Topic } from "~/content/types";
import { Icon } from "../icon/Icon";

export function BookTitle({ book, topic }: { book: BookInfo; topic: Topic }) {
  return (
    <>
      {" "}
      <div className="relative flex flex-col gap-3 flex-1 items-start  max-w-[640px] w-full">
        {/* <div className="hidden md:block absolute inset-0 w-full h-full z-0 gradient-mask border rounded-t-[12px] border-white/10 bg-white/5"></div> */}
        <Link
          to={topic.path}
          className="text-15 font-medium mb-1 flex items-center gap-3"
        >
          <Icon name={topic.icon} className="size-5" />
          {topic.title}
        </Link>
        <h1 className="text-24 sm:text-40 font-bold sm:leading-[1.05em] leading-tight">
          {book.title}
        </h1>
        {book.description ? (
          <p className="text-14">{book.description}</p>
        ) : null}
      </div>
      {/* <div className="hidden md:block"> */}
      {/* </div> */}
    </>
  );
}
