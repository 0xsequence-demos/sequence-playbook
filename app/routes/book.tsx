import {
  LoaderFunctionArgs,
  useLoaderData,
  MetaFunction,
  ActionFunctionArgs,
  Link,
} from "react-router";

import { Main } from "~/components/main/Main";
import { BookTitle } from "~/components/book-title/BookTitle";
import { routeMeta } from "~/utils/route-meta";
import Books from "~/content/books";
import { NoBookContent } from "~/content/no-book-content";
import { Mask } from "~/components/mask/Mask";
import { Image } from "~/components/image/Image";
import { Platforms } from "~/components/platforms/Platforms";
import { Icon } from "~/components/icon/Icon";

export async function action(context: ActionFunctionArgs) {
  const { topic, book } = context.params;

  if (!topic || !book) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const currentTopic = Books.find((d) => d.name === topic);
    const data = currentTopic?.books?.find((b) => b?.info?.name === book);

    let widgets = {};

    const formdata = await context.request.formData();

    // If a dependency has a loader, run it
    if (data?.dependencies) {
      widgets = await data.dependencies.reduce(async (acc, item) => {
        if (item?.action && typeof item?.action === "function") {
          const response = await item.action(context, formdata);
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
    const currentIndex = Books.findIndex((d) => d.name === topic);
    const currentTopic = Books[currentIndex];

    const nextTopic = Books[currentIndex + 1] || Books[0];
    const prevTopic = Books[currentIndex - 1] || Books[Books.length - 1];

    const bookIndex = currentTopic?.books?.findIndex(
      (b) => b?.info?.name === book,
    );

    const data = currentTopic?.books[bookIndex];
    const nextBook = currentTopic?.books[bookIndex + 1] || nextTopic?.books[0];
    const prevBook =
      currentTopic?.books[bookIndex - 1] ||
      prevTopic?.books[prevTopic.books.length - 1];

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

    if (!data || !currentTopic) {
      throw new Error();
    }

    return {
      book: { ...data.info, data: local },
      widgets,
      topic: currentTopic,
      nav: {
        next: nextBook,
        prev: prevBook,
      },
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
  const { book, widgets, topic, nav } = useLoaderData<typeof loader>();
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

        <div className="border-t border-white/10 py-8">
          {/* <pre>{JSON.stringify(nav, null, 2)}</pre> */}
          <Link to={nav.next?.info?.path} className="inline-flex gap-4">
            <Image
              name={nav?.next?.info?.image?.src}
              width={128}
              className="aspect-video object-cover rounded-[0.5rem]"
            />
            <span className="flex flex-col gap-1 justify-center">
              <span className="text-17 font-bold">
                <span className="font-normal">Continue to</span>{" "}
                {nav?.next?.info?.shortname}
              </span>
              <p className="text-14 opacity-75">
                {nav?.next?.info?.description}
              </p>
            </span>
          </Link>
        </div>
      </div>
    </Main>
  );
}

export type LoaderData = Awaited<ReturnType<typeof loader>>;
