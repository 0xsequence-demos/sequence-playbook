import { Link } from "@remix-run/react";
import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";
import { Main } from "~/components/main/Main";

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

        <div className="grid grid-cols-3 gap-3">
          <FeatureCard
            title="Onboard"
            path="/onboard"
            icon=""
            description="Small paragraph text that's not more than two lines that brings a bit more."
          />

          <FeatureCard
            title="Monetize"
            path="/monetize"
            icon=""
            description="Small paragraph text that's not more than two lines that brings a bit more."
          />

          <FeatureCard
            title="Power"
            path="/power"
            icon=""
            description="Small paragraph text that's not more than two lines that brings a bit more."
          />
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
}: {
  title: string;
  path: string;
  description: string;
  icon: string;
}) {
  return (
    <InheritLinkFromChild asChild>
      <div className="rounded-[1rem] p-10 bg-white/10 flex flex-col items-center gap-4 aspect-square justify-center bg-gradient-to-br from-blue-800/50 via-blue-950/20 to-blue-950/30">
        <div className="size-[5rem] border border-white/10">{icon}</div>
        <Link to={path} className="text-28 font-bold text-center">
          {title}
        </Link>
        <p className="line-clamp-2 text-center">{description}</p>
      </div>
    </InheritLinkFromChild>
  );
}
