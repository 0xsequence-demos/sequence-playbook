import { Link } from "@remix-run/react";
import { Icon } from "~/components/icon/Icon";
import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";
import { Main } from "~/components/main/Main";
import { TOPICS } from "~/data/data";

export default function IndexRoute() {
  return (
    <Main>
      <div className="w-full max-w-screen-xl px-8 py-16 gap-10 flex flex-col">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <h1 className="text-48 font-bold">Sequence Playbook</h1>
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

        <div className="grid md:grid-cols-3 gap-3">
          {TOPICS.map((topic) => (
            <FeatureCard
              key={topic.path}
              title={topic.title}
              path={topic.path}
              icon={topic.icon}
              description={topic.description}
              theme={topic.theme}
            />
          ))}
        </div>
      </div>
    </Main>
  );
}

function FeatureCard({
  title,
  description,
  path,
  icon,
  theme,
}: {
  title: string;
  path: string;
  description: string;
  icon: string;
  theme: {
    bgImage: string;
    bookColor: string;
  };
}) {
  return (
    <InheritLinkFromChild asChild>
      <div
        className="rounded-[1rem] p-10 bg-white/10 flex flex-col items-center gap-4 aspect-square justify-center bg-img"
        style={
          {
            "--bg-image": `url('./${theme.bgImage}.svg')`,
          } as React.CSSProperties
        }
      >
        <Icon name={icon} className="size-[4.5rem]" />

        <Link to={path} className="text-28 font-bold text-center">
          {title}
        </Link>
        <p className="line-clamp-2 text-center">{description}</p>
      </div>
    </InheritLinkFromChild>
  );
}
