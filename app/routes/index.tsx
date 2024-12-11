import { MetaFunction, useLoaderData, Link } from "react-router";
import { Main } from "~/components/main/Main";
import { routeMeta } from "~/utils/route-meta";
import Topics from "~/content/topics";
import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";

export const meta: MetaFunction = (args) => {
  return routeMeta(
    {
      title: "Sequence Playbook",
      description: "",
      image: "",
    },
    args
  );
};

export async function loader() {
  const data = Topics;

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return data;
}

export default function IndexRoute() {
  const topics = useLoaderData<typeof loader>();
  return (
    <>
      <Main>
        <div className="relative grid grid-cols-4 gap-3 md:px-12 md:py-12">
          <div className="hidden md:block absolute inset-0 w-full h-full z-0 gradient-mask border rounded-t-[12px] border-white/10 bg-white/5"></div>
          <div className="col-span-3 z-10 flex flex-col gap-3">
            <img
              src="/sequence-logo@2x.png"
              width="108"
              height="20"
              alt="Sequence"
            />
            <h1 className="text-32 sm:text-40 font-bold sm:leading-[1.05em] leading-tight">
              Playbook
            </h1>
            <p className="mt-4">
              Follow our Playbook guides to enhance onboarding, unlock new
              monetization opportunities, and supercharge your app with seamless
              Web3 integrations.
            </p>
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
        <div className="w-full grid grid-cols-1 mx-auto max-w-[256px] sm:mx-none sm:max-w-none sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch md:px-12 mt-8 md:mt-0">
          {topics.map((topic) => (
            <InheritLinkFromChild asChild key={topic.path}>
              <div className="aspect-video bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white p-4 rounded-[1rem] flex flex-col items-center justify-center">
                <img
                  src={`/${topic.icon}`}
                  alt={""}
                  width="40"
                  height="40"
                  className="mb-2"
                />

                <h2 className="text-18 font-semibold text-left inline-flex items-center leading-tight px-3">
                  <Link to={topic.path}>{topic.title}</Link>
                </h2>

                <p className="text-14 text-white/70">{topic.description}</p>
                {/* {book.hero ? (
                    <div className="">
                      <img
                        src={`/${book.hero.image}`}
                        alt={book.hero.alt ?? ""}
                        width={book.hero.width}
                        height={book.hero.height}
                      />
                    </div>
                  ) : null} */}
              </div>
            </InheritLinkFromChild>
          ))}
        </div>
      </Main>
    </>
  );
}
