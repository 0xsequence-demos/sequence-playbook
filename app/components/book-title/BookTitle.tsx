import { Link } from "react-router";
import { Icon } from "../icon/Icon";
import { Book, Topic } from "~/content/types";

export function BookTitle({ book, topic }: { book: Book; topic: Topic }) {
  return (
    <div className="sm:px-4">
      <div
        className={`px-4 py-8 sm:p-10 sm:rounded-[1rem] flex gap-6 bg-cover  ${topic.theme.bgImage}`}
      >
        <div className="flex flex-col gap-3 flex-1">
          <Link
            to={topic.path}
            className="bg-white/10 rounded-full px-3 py-1 self-start text-13 inline-flex items-center gap-2 mb-8 sm:mb-0"
          >
            <Icon name="arrow-left" className="size-3" />
            Back to {topic.title}
          </Link>
          <h1 className="text-22 sm:text-28 font-bold sm:leading-[1.5] leading-tight">
            {book.title}
          </h1>
          {book.description ? (
            <p className="text-14">{book.description}</p>
          ) : null}
        </div>
        <div className="hidden sm:grid grid-sols-1 grid-rows-1">
          <Icon
            name="book-base"
            className={`${topic.theme.bookColor} col-start-1 row-start-1`}
          />
          {book.bookIcon ? (
            <Icon
              name={book.bookIcon}
              className="text-white col-start-1 row-start-1"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
