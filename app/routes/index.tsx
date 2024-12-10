import { MetaFunction } from "react-router";
import { Main } from "~/components/main/Main";
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
    <>
      <Main asChild>
        <main className="md:mt-32 flex flex-col items-start justify-start">
          <h1 className="text-40 font-bold leading-tight self-start">
            Sequence Playbook
          </h1>
        </main>
      </Main>
    </>
  );
}
