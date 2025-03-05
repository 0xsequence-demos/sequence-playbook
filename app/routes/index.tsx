import { MetaFunction, useLoaderData, Link } from "react-router";
import { Main } from "~/components/main/Main";
import { routeMeta } from "~/utils/route-meta";
import Books from "~/content/books";
import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";
import { Mask } from "~/components/mask/Mask";
import { Image } from "~/components/image/Image";
import { Icon } from "../components/icon/Icon";

export const meta: MetaFunction = (args) => {
  return routeMeta(
    {
      title: "Sequence Blueprints",
      description: "",
      image: "",
    },
    args,
  );
};

export async function loader() {
  const data = Books;

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
        <div className=" relative top-[-96px] z-[0] isolate right-0 w-full">
          <Mask.BoxFade>
            <Image
              name="home"
              className="object-cover aspect-video"
              width={2400}
            />
          </Mask.BoxFade>
        </div>

        <div className="-mt-32 md:-mt-96 z-10 flex flex-col gap-3 mb-12 max-w-[640px] w-full ">
          <Image name="sequence-logo" alt="Sequence" width={96} />
          <h1 className="text-32 sm:text-40 font-bold sm:leading-[1.05em] leading-tight">
            Blueprints
          </h1>
          <p className="mt-4">
            Explore with the Sequence stack with interactive examples.
          </p>
          <p>
            See how effortlessly you can build, manage, and scale powerful
            blockchain apps.
          </p>
          <p>No setup, just code.</p>
        </div>

        <div className="w-full grid grid-cols-1 mx-auto sm:mx-none sm:max-w-none sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
          {topics.map((topic) => (
            <InheritLinkFromChild asChild key={topic.path}>
              <div className="aspect-video bg-white/5  hover:bg-white/10 text-white p-4 rounded-[1rem] flex flex-col items-center justify-center backdrop-blur-sm">
                <Icon name={topic.icon} className="size-8 mb-2" />

                <h2 className="text-18 font-semibold text-left inline-flex items-center leading-tight px-3 mb-2">
                  <Link to={topic.path}>{topic.title}</Link>
                </h2>

                <p className="text-14 text-white/70 text-center leading-tight">
                  {topic.description}
                </p>
              </div>
            </InheritLinkFromChild>
          ))}
        </div>
      </Main>
    </>
  );
}
