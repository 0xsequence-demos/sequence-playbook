import { MetaFunction } from "react-router";
import { BookTitle } from "~/components/book-title/BookTitle";
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
      <Main>
        <div className="relative grid grid-cols-4 gap-3 flex-1 md:px-12 md:py-12">
          <div className="hidden md:block absolute inset-0 w-full h-full z-0 gradient-mask border rounded-t-[12px] border-white/10 bg-white/5"></div>
          <div className="col-span-3 z-10 flex flex-col gap-3">
            <h1 className="text-32 sm:text-40 font-bold sm:leading-[1.05em] leading-tight">
              Sequence Playbook
            </h1>
            <p>
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
      </Main>
    </>
  );
}
