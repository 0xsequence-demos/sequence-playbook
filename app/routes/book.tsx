import { LoaderFunctionArgs, useLoaderData, MetaFunction } from "react-router";

import { Main } from "~/components/main/Main";
import { BookTitle } from "~/components/book-title/BookTitle";
import { routeMeta } from "~/utils/route-meta";
import Books from "~/content/books";
import Topics from "~/content/topics";
import { NoBookContent } from "~/content/no-book-content";

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
    <Main className="">
      {book.image ? (
        <div className="absolute top-0 right-0 w-[700px] h-[525px] opacity-35">
          <div className="book-hero-image-outer-gradient-mask ">
            <div className="book-hero-image-inner-gradient-mask ">
              <img
                src={book.image.src}
                alt={book.image.alt ?? ""}
                width={book.image.width || 1600}
                height={book.image.height || 1200}
                className="object-cover"
                // className={`absolute ${book.hero.className}`}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full gap-10 flex flex-col isolate pb-16">
        <BookTitle book={book} topic={topic} />
        <div className=" w-full gap-4 flex flex-col isolate book-content">
          <Book />
        </div>
      </div>
    </Main>
  );
}

export type LoaderData = Awaited<ReturnType<typeof loader>>;
