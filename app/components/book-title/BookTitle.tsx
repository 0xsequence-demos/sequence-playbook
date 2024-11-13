import { Link } from "@remix-run/react";
import { Icon } from "../../components/icon/Icon";
import { Book, Topic } from "~/data/types";

export function BookTitle({ book, topic }: { book: Book; topic: Topic }) {
  return (
    <div
      className="p-10 rounded-[1rem] bg-img flex gap-6 leading-[1.5] bg-cover"
      style={
        {
          "--bg-image": `url('/${topic.theme.bgImage}.svg')`,
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col gap-3 flex-1">
        <Link
          to={topic.path}
          className="bg-white/10 rounded-full px-3 py-1 self-start text-13 inline-flex items-center gap-2"
        >
          <Icon name="arrow-left" className="size-3" />
          Back to {topic.title}
        </Link>
        <h1 className="text-28 font-bold">{book.title}</h1>
        {book.description ? (
          <p className="text-14 font-medium">{book.description}</p>
        ) : null}
      </div>
      <div className="grid grid-sols-1 grid-rows-1">
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
  );
}
