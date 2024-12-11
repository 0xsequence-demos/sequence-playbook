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
  const { title, description, name, books } = useLoaderData<typeof loader>();

  return (
    <Main>
      <div className="relative grid grid-cols-4 gap-3 md:px-12 md:py-12">
        <div className="hidden md:block absolute inset-0 w-full h-full z-0 gradient-mask border rounded-t-[12px] border-white/10 bg-white/5"></div>
        <div className="col-span-3 z-10 flex flex-col gap-3">
          <h1 className="text-32 sm:text-40 font-bold sm:leading-[1.05em] leading-tight">
            {title}
          </h1>
          <p>{description}</p>
        </div>
        <div>
          <img
            src="/home-hero@2x.png"
            alt=""
            width="468"
            height="289"
            className={`absolute top-[-60px] right-[-80px]`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 mx-auto max-w-[256px] sm:mx-none sm:max-w-none sm:grid-cols-2 md:grid-cols-2 gap-4 items-stretch md:px-12">
        {books.map((book) => (
          <InheritLinkFromChild asChild key={book.path}>
            <div className="aspect-video bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white p-4 rounded-[1rem] grid grid-cols-4 items-center justify-center">
              <h2 className="col-span-3 text-18 font-semibold text-left min-h-[3.5rem] inline-flex items-center leading-tight px-3">
                <Link to={`/${name}/${book.name}`}>{book.title}</Link>
              </h2>
              {book.hero ? (
                <div className="">
                  <img
                    src={`/${book.hero.image}`}
                    alt={book.hero.alt ?? ""}
                    width={book.hero.width}
                    height={book.hero.height}
                  />
                </div>
              ) : null}
            </div>
          </InheritLinkFromChild>
        ))}
      </div>
    </Main>
  );
}
