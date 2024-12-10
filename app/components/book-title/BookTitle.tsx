import { Link } from "react-router";
import { Book, Topic } from "~/content/types";

export function BookTitle({ book, topic }: { book: Book; topic: Topic }) {
  return (
    <div className="flex flex-col gap-3 flex-1">
      <Link
        to={topic.path}
        className="text-15 font-medium mb-1 flex items-center gap-3"
      >
        <img src={`/${topic.icon}`} alt="" width="20" height="20" />

        {topic.title}
      </Link>
      <h1 className="text-22 sm:text-40 font-bold sm:leading-[1.05em] leading-tight">
        {book.title}
      </h1>
      {book.description ? <p className="text-14">{book.description}</p> : null}
    </div>
  );
}
