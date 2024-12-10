import { LoaderFunctionArgs } from "react-router";
import { useLoaderData, MetaFunction } from "react-router";
import { Main } from "~/components/main/Main";
import { BookTitle } from "~/components/book-title/BookTitle";
import { routeMeta } from "~/utils/route-meta";
import Books from "~/content/books";
import Topics from "~/content/topics";
import { NoBookContent } from "~/content/books/no-book-content";

export async function loader({ params }: LoaderFunctionArgs) {
  const { topic, book } = params;

  if (topic && book) {
    try {
      const parentTopic = Topics.find((d) => d.name === topic);

      const data = parentTopic?.books?.find((b) => b.name === book);

      if (!data || !parentTopic) {
        throw new Error();
      }

      return {
        book: data,
        topic: parentTopic,
      };
    } catch {
      throw new Response("Not Found", { status: 404 });
    }
  }

  throw new Response("Not Found", { status: 404 });
}

export const meta: MetaFunction<typeof loader> = (args) => {
  return routeMeta(
    {
      title: args?.data?.book?.title,
      description: "",
      image: "",
    },
    args
  );
};

export default function BookCatchall() {
  const { book, topic } = useLoaderData<typeof loader>();

  const Book = Object.prototype.hasOwnProperty.call(Books, book.name)
    ? Books[book.name]
    : NoBookContent;

  return (
    <Main className="relative">
      <div className="hidden sm:block w-full h-[100px] bg-chessboard absolute" />
      <div className="w-full max-w-screen-xl sm:py-16 gap-10 flex flex-col isolate">
        <Book>
          <BookTitle book={book} topic={topic} />
        </Book>
      </div>
    </Main>
  );
}

export type LoaderData = Awaited<ReturnType<typeof loader>>;
