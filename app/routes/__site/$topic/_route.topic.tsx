import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
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
        <div className="p-6 bg-gradient-to-br from-blue-900 to-blue-900/50 rounded-[1rem] flex gap-8">
          <div className="size-[4.5rem] border border-white/10"></div>

          <div className="flex flex-col gap-2">
            <h1 className="text-28 font-bold">{data.title}</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {data.books.map((book) => (
            <InheritLinkFromChild asChild key={book.path}>
              <div className="bg-white/10 text-white p-4 rounded-[1rem] shadow-md aspect-square flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold text-center">
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
