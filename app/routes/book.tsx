import {
  LoaderFunctionArgs,
  useLoaderData,
  MetaFunction,
  ActionFunctionArgs,
} from "react-router";

import { Main } from "~/components/main/Main";
import { BookTitle } from "~/components/book-title/BookTitle";
import { routeMeta } from "~/utils/route-meta";
import Books from "~/content/books";
import { NoBookContent } from "~/content/no-book-content";
import { Mask } from "~/components/mask/Mask";
import { Image } from "~/components/image/Image";
import { Platforms } from "~/components/platforms/Platforms";

export async function action(context: ActionFunctionArgs) {
  const { topic, book } = context.params;

  if (!topic || !book) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const parentTopic = Books.find((d) => d.name === topic);
    const data = parentTopic?.books?.find((b) => b?.info?.name === book);

    let widgets = {};

    // If a dependency has a loader, run it
    if (data?.dependencies) {
      widgets = await data.dependencies.reduce(async (acc, item) => {
        if (item?.action && typeof item?.action === "function") {
          const response = await item.action(context);
          acc[item.id] = response;
          return acc;
        }
        return acc;
      }, {});
    }
    let local = {};
    if (data?.loader && typeof data?.loader === "function") {
      local = await data?.loader(context);
    }

    return {
      book: local,
      widgets,
    };
  } catch {
    throw new Response("Not Found", { status: 404 });
  }
}

export async function loader(context: LoaderFunctionArgs) {
  const { topic, book } = context.params;

  if (!topic || !book) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const parentTopic = Books.find((d) => d.name === topic);

    const data = parentTopic?.books?.find((b) => b?.info?.name === book);

    let widgets = {};

    // If a dependency has a loader, run it
    if (data?.dependencies) {
      widgets = await data.dependencies.reduce(async (acc, item) => {
        if (item?.loader && typeof item?.loader === "function") {
          const response = await item.loader(context);
          acc[item.id] = response;
          return acc;
        }
        return acc;
      }, {});
    }

    let local = {};
    if (data?.loader && typeof data?.loader === "function") {
      local = await data?.loader(context);
    }

    if (!data || !parentTopic) {
      throw new Error();
    }

    return {
      book: { ...data.info, data: local },
      widgets,
      topic: parentTopic,
    };
  } catch {
    throw new Response("Not Found", { status: 404 });
  }
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
  const { book, widgets, topic } = useLoaderData<typeof loader>();
  const bookTopic = Object.values(Books).find((d) => d.name === topic.name);

  const Book = bookTopic
    ? bookTopic.books.find((item) => item?.info?.name === book.name)
        ?.component || NoBookContent
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
          <Book book={book} widgets={widgets} topic={topic} />
        </div>
      </div>
    </Main>
  );
}

export type LoaderData = Awaited<ReturnType<typeof loader>>;
