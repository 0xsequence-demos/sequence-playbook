import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { Link, useLoaderData } from "@remix-run/react";
import { Main } from "~/components/main/Main";
import { getLoaderBookData } from "~/helpers/get-loader-book-data";

export async function loader({ params }: LoaderFunctionArgs) {
  const { book, topic } = getLoaderBookData(params);

  return {
    book,
    topic,
  };
}

export default function BookCatchall() {
  const { book, topic } = useLoaderData<typeof loader>();

  return (
    <Main>
      <div className="w-full max-w-screen-xl px-8 py-16 gap-10 flex flex-col">
        <div className="p-10 rounded-[1rem] bg-blue-700 flex flex-col gap-3 leading-[1.5]">
          <Link to={topic.path}>Back to {topic.title}</Link>
          <h1 className="text-28 font-bold">{book.title}</h1>
          {book.description ? (
            <p className="text-14 font-medium">{book.description}</p>
          ) : null}
        </div>
      </div>
    </Main>
  );
}
