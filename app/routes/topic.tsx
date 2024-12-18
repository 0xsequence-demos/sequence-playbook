import { Fragment, useCallback } from "react";
import {
  Link,
  useLoaderData,
  MetaFunction,
  LoaderFunctionArgs,
} from "react-router";
import { DebugObject } from "~/components/debug/DebugObject";
import { BackgroundImage, Image } from "~/components/image/Image";

import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";
import { Main } from "~/components/main/Main";
import { Mask } from "~/components/mask/Mask";
import Topics from "~/content/topics";

import { routeMeta } from "~/utils/route-meta";
export async function loader({ params }: LoaderFunctionArgs) {
  const { topic } = params;

  const data = Topics.find((d) => d.name === topic);

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
    args
  );
};

export default function TopicRoute() {
  const { icon, title, description, name, books } =
    useLoaderData<typeof loader>();

  return (
    <Main>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-35">
        <Mask.BoxFade>
          <Image name="home" className="object-cover" />
        </Mask.BoxFade>
      </div>
      <div className="flex flex-col gap-2 mb-12">
        {/* <div className="hidden md:block absolute inset-0 w-full h-full z-0 gradient-mask border rounded-t-[12px] border-white/10 bg-white/5"></div> */}

        <Image name={icon} width={48} loading="lazy" />
        <h1 className="text-32 sm:text-40 font-bold sm:leading-[1.05em] leading-tight">
          {title}
        </h1>
        <p>{description}</p>
      </div>

      <div className="grid grid-cols-1 mx-auto sm:mx-none sm:max-w-none sm:grid-cols-2 md:grid-cols-2 md:gap-8 gap-4 items-stretch w-full">
        {books.map((book) => (
          <Fragment key={book.path}>
            <BackgroundImage name={book?.image?.src} />
            <InheritLinkFromChild asChild>
              <div
                data-background={book?.image?.src}
                className="aspect-video rounded-[0.75rem] relative flex flex-col justify-end overflow-clip bg-cover bg-center bg-no-repeat hover:-translate-y-1 hover:scale-[1.01] transition-transform duration-300 group"
              >
                <div className="absolute size-full inset-0 border group-hover:border-white/30 border-white/10 transition-all duration-300 rounded-[0.75rem] pointer-events-none"></div>
                <div className="flex flex-col px-8 p-8 bg-gradient-to-b from-0% to-40% from-deep-purple-900/0 to-deep-purple-900/95 gap-1">
                  {/* <span className="text-[9px] uppercase font-bold">
                    {item.type}
                  </span> */}
                  <Link
                    to={`/${name}/${book.name}`}
                    className="text-20 font-bold leading-tight"
                  >
                    {book.shortname}
                  </Link>

                  <p className="text-14 text-white/70">{book.title}</p>
                </div>
              </div>
            </InheritLinkFromChild>
          </Fragment>
        ))}
      </div>
    </Main>
  );
}
