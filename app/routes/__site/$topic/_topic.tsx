import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { Icon } from "~/components/icon/Icon";
import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";
import { Main } from "~/components/main/Main";
import { TOPICS } from "~/data/data";
export async function loader({ params }: LoaderFunctionArgs) {
  const { topic } = params;

  const data = TOPICS.find((d) => d.name === topic);

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    data,
  };
}

export default function TopicRoute() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Main>
      <div className="w-full max-w-screen-xl px-8 py-16 gap-10 flex flex-col">
        <div
          className="px-10 py-8 bg-img rounded-[1rem] flex gap-8 bg-cover"
          style={
            {
              "--bg-image": `url('/${data.theme.bgImage}.svg')`,
            } as React.CSSProperties
          }
        >
          <Icon name={data.icon} className="size-[4.5rem]" />

          <div className="flex flex-col gap-2">
            <h1 className="text-28 font-bold">{data.title}</h1>
            {data.description ? <p>{data.description}</p> : null}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {data.books.map((book) => (
            <InheritLinkFromChild asChild key={book.path}>
              <div className="bg-white/10 text-white p-4 rounded-[1rem] shadow-md aspect-square flex flex-col items-center justify-center gap-6">
                <div className="grid grid-sols-1 grid-rows-1">
                  <Icon
                    name="book-base"
                    className={`${data.theme.bookColor} col-start-1 row-start-1`}
                  />
                  {book.bookIcon ? (
                    <Icon
                      name={book.bookIcon}
                      className="text-white col-start-1 row-start-1"
                    />
                  ) : null}
                </div>
                <h2 className="text-lg font-semibold text-center min-h-[3.5rem] inline-flex items-center">
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
