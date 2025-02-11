import { Fragment } from "react";
import {
  Link,
  useLoaderData,
  MetaFunction,
  LoaderFunctionArgs,
} from "react-router";
import { BackgroundImage, Image } from "~/components/image/Image";

import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";
import { Main } from "~/components/main/Main";
import Books from "~/content/books";

import { routeMeta } from "~/utils/route-meta";

export async function loader({ params }: LoaderFunctionArgs) {
  const { topic } = params;

  const data = Books.find((d) => d.name === topic);

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return data;
}

export const meta: MetaFunction<typeof loader> = (args) => {
  return routeMeta(
    {
      title: args?.data?.title,
      description: "",
      image: "",
    },
    args,
  );
};

export default function TopicRoute() {
  const { icon, title, description, name, books } =
    useLoaderData<typeof loader>();

  return (
    <Main>
      <div className="flex flex-col gap-2 mb-12">
        <Image name={icon} width={48} />
        <h1 className="text-32 sm:text-40 font-bold sm:leading-[1.05em] leading-tight">
          {title}
        </h1>
        <p>{description}</p>
      </div>

      <div className="grid grid-cols-1 mx-auto sm:mx-none sm:max-w-none md:grid-cols-2 xl:grid-cols-3 gap-4  items-stretch w-full">
        {books.map((book) => (
          <Fragment key={book.info.path}>
            <BackgroundImage name={book?.info?.image?.src} />
            <InheritLinkFromChild asChild>
              <div
                data-background={book?.info?.image?.src}
                className="aspect-video rounded-[0.75rem] relative flex flex-col justify-end overflow-clip bg-cover bg-center bg-no-repeat hover:-translate-y-1 hover:scale-[1.01] transition-transform duration-300 group"
              >
                <div className="absolute size-full inset-0  transition-all duration-300 rounded-[0.75rem] pointer-events-none"></div>
                <div className="flex flex-col px-8 p-8 bg-gradient-to-b from-0% to-40% from-deep-purple-900/0 to-deep-purple-900/95 gap-1">
                  {/* <span className="text-[9px] uppercase font-bold">
                    {item.type}
                  </span> */}
                  <Link
                    to={`/${name}/${book.info.name}`}
                    className="text-20 font-bold leading-tight"
                  >
                    {book.info.shortname}
                  </Link>

                  <p className="text-14 text-white/70">{book.info.title}</p>
                </div>
              </div>
            </InheritLinkFromChild>
          </Fragment>
        ))}
      </div>
    </Main>
  );
}
