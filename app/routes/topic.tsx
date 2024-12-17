import {
  Link,
  useLoaderData,
  MetaFunction,
  LoaderFunctionArgs,
} from "react-router";

import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";
import { Main } from "~/components/main/Main";
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
        <div className="book-hero-image-outer-gradient-mask ">
          <div className="book-hero-image-inner-gradient-mask ">
            <img
              src="/resources/home.webp"
              alt=""
              width={1600}
              height={1600}
              className="object-cover"
              // className={`absolute ${book.hero.className}`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-12">
        {/* <div className="hidden md:block absolute inset-0 w-full h-full z-0 gradient-mask border rounded-t-[12px] border-white/10 bg-white/5"></div> */}

        <img src={icon} width="48" height="48" alt="" />
        <h1 className="text-32 sm:text-40 font-bold sm:leading-[1.05em] leading-tight">
          {title}
        </h1>
        <p>{description}</p>
      </div>

      <div className="grid grid-cols-1 mx-auto max-w-[256px] sm:mx-none sm:max-w-none sm:grid-cols-2 md:grid-cols-2 md:gap-8 gap-4 items-stretch w-full">
        {books.map((book) => (
          <InheritLinkFromChild key={book.path} asChild>
            <div
              className="aspect-video rounded-[0.75rem] relative flex flex-col justify-end overflow-clip bg-cover bg-center bg-no-repeat hover:-translate-y-1 hover:scale-[1.01] transition-transform duration-300 group"
              style={
                book?.image?.src
                  ? {
                      backgroundImage: `url(${book.image.src})`,
                    }
                  : {}
              }
            >
              <div className="absolute size-full inset-0 border group-hover:border-white/30 border-white/10 transition-all duration-300 rounded-[0.75rem] pointer-events-none"></div>
              <div className="flex flex-col px-4 p-4 bg-gradient-to-b from-0% to-40% from-deep-purple-600/0 to-deep-purple-600/95 gap-1">
                {/* <span className="text-[9px] uppercase font-bold">
                    {item.type}
                  </span> */}
                <Link
                  to={`/${name}/${book.name}`}
                  className="text-19 font-bold leading-tight"
                >
                  {book.shortname}
                </Link>

                <p className="text-14 text-white/70">{book.title}</p>
              </div>
            </div>
          </InheritLinkFromChild>
        ))}
      </div>
    </Main>
  );
}
