import { LoaderFunctionArgs, useLoaderData, MetaFunction } from "react-router";

import { Main } from "~/components/main/Main";
import { BookTitle } from "~/components/book-title/BookTitle";
import { routeMeta } from "~/utils/route-meta";

import Books from "~/content/books";
import { NoBookContent } from "~/content/no-book-content";
import { Mask } from "~/components/mask/Mask";
import { Image } from "~/components/image/Image";
import { Platforms } from "~/components/platforms/Platforms";

export async function loader({ params }: LoaderFunctionArgs) {
  const { topic, book } = params;

  if (topic && book) {
    try {
      const parentTopic = Books.find((d) => d.name === topic);

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
    args,
  );
};

export default function BookCatchall() {
  const { book, topic } = useLoaderData<typeof loader>();

  const bookTopic = Object.values(Books).find((d) => d.name === topic.name);

  // const Book = Object.prototype.hasOwnProperty.call(Topics, book.name)
  //   ? Topics[book.name]?.content

  //   : NoBookContent;

  const Book = bookTopic
    ? bookTopic.books.find((item) => item.name === book.name)?.content ||
      NoBookContent
    : NoBookContent;

  return (
    <Main className="">
      {book.image ? (
        <div className="hidden md:block absolute top-0 right-0 w-[700px] h-[525px] opacity-35">
          <Mask.BoxFade>
            <Image name={book.image.src} />
          </Mask.BoxFade>
        </div>
      ) : null}
      <div className="w-full gap-10 flex flex-col isolate pb-16">
        <BookTitle book={book} topic={topic} />
        <Platforms platforms={book?.platforms} />
        <div className=" w-full gap-4 flex flex-col isolate book-content">
          <Book />
        </div>
      </div>
    </Main>
  );
}

export type LoaderData = Awaited<ReturnType<typeof loader>>;
