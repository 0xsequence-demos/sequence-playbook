import { Link, useLoaderData, MetaFunction } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { Icon } from "~/components/icon/Icon";
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
  const data = useLoaderData<typeof loader>();

  const style = {
    "--bg-image": `url('/${data.theme.bgImage}.svg')`,
  } as React.CSSProperties;

  return (
    <Main className="relative">
      <div className="w-full h-[100px] bg-chessboard absolute" />

      <div className="w-full max-w-screen-xl sm:px-4 sm:py-16 gap-10 flex flex-col isolate">
        <div
          className="px-4 sm:px-10 py-8 bg-img sm:rounded-[1rem] flex gap-8 bg-cover max-sm:flex-col max-sm:text-center max-sm:items-center"
          style={style}
        >
          <Icon name={data.icon} className="size-[4.5rem]" />

          <div className="flex flex-col gap-2">
            <h1 className="text-28 font-bold">{data.title}</h1>
            {data.description ? <p>{data.description}</p> : null}
          </div>
        </div>

        <div className="grid grid-cols-1 mx-auto max-w-[256px] sm:mx-none sm:max-w-none sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
          {data.books.map((book) => (
            <InheritLinkFromChild asChild key={book.path}>
              <div className="bg-white/10 text-white p-4 rounded-[1rem] shadow-md aspect-square flex flex-col items-center justify-center gap-6">
                <div className="grid grid-cols-1 grid-rows-1">
                  <Icon
                    name="book-base"
                    className={`${data.theme.bookColor} col-start-1 row-start-1 max-w-full size-24 md:size-auto`}
                  />
                  {book.bookIcon ? (
                    <Icon
                      name={book.bookIcon}
                      className="text-white col-start-1 row-start-1 max-w-full size-24 md:size-auto"
                    />
                  ) : null}
                </div>
                <h2 className="text-18 font-semibold text-center min-h-[3.5rem] inline-flex items-center leading-tight px-3">
                  <Link to={`/${data.name}/${book.name}`}>{book.title}</Link>
                </h2>
              </div>
            </InheritLinkFromChild>
          ))}
        </div>
      </div>
    </Main>
  );
}
