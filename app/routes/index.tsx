import { Link, MetaFunction } from "react-router";
import { BackgroundIconGrid } from "~/components/background-icon-grid/BackgroundIconGrid";
import { Icon } from "~/components/icon/Icon";
import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";
import { Main } from "~/components/main/Main";
import Topics from "~/content/topics";
import { routeMeta } from "~/utils/route-meta";

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

export default function IndexRoute() {
  return (
    <Main asChild>
      <main>
        <BackgroundIconGrid></BackgroundIconGrid>

        <div className="w-full max-w-screen-xl px-8 py-16 gap-10 flex flex-col relative isolate">
          <div className="w-full flex flex-col items-center justify-center gap-6 text-center sm:text-start ">
            <span className="flex-col sm:flex-row flex gap-4 items-center">
              <Icon name="SequenceLogo" className="size-16 md:size-20" />
              <h1 className="text-24 md:text-48 font-bold leading-tight">
                Sequence Playbook
              </h1>
            </span>
            <span>
              Mini tutorials on how to use{" "}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Sequence
              </a>
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[256px] md:max-w-none mx-auto">
            {Topics.map((topic) => (
              <InheritLinkFromChild asChild key={topic.path}>
                <div
                  className={`rounded-[1rem] transition-transform hover:-translate-y-2 duration-150 hover:scale-105 p-10 bg-white/10 flex flex-col items-center gap-4 aspect-square justify-center ${topic.theme.bgImage} bg-no-repeat bg-cover`}
                >
                  <Icon
                    name={topic.icon}
                    className="size-[3rem] md:size-[4.5rem]"
                  />

                  <Link
                    to={topic.path}
                    className="text-18 md:text-28 font-bold text-center"
                  >
                    {topic.title}
                  </Link>
                  <p className="line-clamp-2 text-center">
                    {topic.description}
                  </p>
                </div>
              </InheritLinkFromChild>
            ))}
          </div>
        </div>
      </main>
    </Main>
  );
}
