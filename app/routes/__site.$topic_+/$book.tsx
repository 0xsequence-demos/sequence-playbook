import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import { Main } from "~/components/main/Main";
import { getLoaderBookData } from "~/helpers/get-loader-book-data";
import { BookTitle } from "~/components/book-title/BookTitle";

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
        <BookTitle book={book} topic={topic} />
      </div>
    </Main>
  );
}
