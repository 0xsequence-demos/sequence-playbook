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
        <div className=" z-10 flex flex-col gap-3 mb-12 max-w-[640px] w-full ">
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

        <div className="w-full grid grid-cols-1 mx-auto max-w-[256px] sm:mx-none sm:max-w-none sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
          {topics.map((topic) => (
            <InheritLinkFromChild asChild key={topic.path}>
              <div className="aspect-video bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white p-4 rounded-[1rem] flex flex-col items-center justify-center backdrop-blur-sm">
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
              </div>
            </InheritLinkFromChild>
          ))}
        </div>
      </Main>
    </>
  );
}
