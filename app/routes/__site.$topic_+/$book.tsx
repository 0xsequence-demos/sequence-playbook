import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { TOPICS } from "../../data/data";
import { useLoaderData } from "@remix-run/react";
import { Main } from "~/components/main/Main";

export async function loader({ params }: LoaderFunctionArgs) {
  const { topic, book } = params;

  console.log(topic, book);

  if (topic && book) {
    try {
      const data = TOPICS.find((d) => d.name === topic)?.books?.find(
        (b) => b.name === book
      );

      if (!data) {
        throw new Error();
      }

      return {
        data,
      };
    } catch {
      throw new Response("Not Found", { status: 404 });
    }
  }

  throw new Response("Not Found", { status: 404 });
}

export default function BookCatchall() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Main>
      <div className="w-full max-w-screen-xl px-8 py-16 gap-10 flex flex-col">
        <div className="p-10 rounded-[1rem] bg-blue-700 flex flex-col gap-3 leading-[1.5]">
          <h1 className="text-28 font-bold">{data.title}</h1>
          {data.description ? (
            <p className="text-14 font-medium">{data.description}</p>
          ) : null}
        </div>
      </div>
    </Main>
  );
}
