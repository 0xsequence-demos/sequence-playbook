import { Outlet, Link, NavLink } from "react-router";
import Topics from "~/content/topics";
// import { Icon } from "../components/icon/Icon";
// import Drawer from "~/components/drawer/Drawer";
import { Fragment } from "react";

export default function SiteLayout() {
  return (
    <>
      <header className="z-50 h-[8rem] flex items-center sm:sticky top-0">
        <div className="max-w-screen-xl w-full mx-auto flex justify-between gap-x-4 min-h-[4rem]  items-center px-12">
          <div className="my-12">
            <Link to="/">
              <img
                src="/playbook-logo@2x.png"
                width="120"
                height="32"
                alt="Playbook"
              />
            </Link>
          </div>

          {/* <Drawer
            trigger={
              <button
                type="button"
                className="block sm:hidden border border-white/20 p-1 rounded-[8px] bg-white/10"
              >
                <Icon name="menu" className="size-5" alt="Menu" />
              </button>
            }
          >
            {Topics.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className="p-4 rounded-[0.5rem] hover:bg-white/10 inline-flex gap-2 items-center aria-[current]:text-white font-semibold "
              >
                <Icon name={link.icon} className="size-[1.5rem]" />

                {link.title}
              </NavLink>
            ))}
          </Drawer> */}
        </div>
      </header>
      <div className="w-full h-[50rem] bg-[linear-gradient(to_bottom,theme(colors.deep-purple.950/10%)_50%,theme(colors.deep-purple.950/100%)),url('/bg-body@2x.png')] absolute inset-0 isolate z-0"></div>
      <img
        src="/home-hero@2x.png"
        alt=""
        width="468"
        height="289"
        className="absolute right-8 top-8"
      />
      <div className="flex flex-col sm:grid sm:grid-cols-[16rem_1fr] gap-24 flex-1 items-stretch px-12 isolate max-w-screen-xl w-full mx-auto relative">
        <div className="hidden sm:flex flex-col gap-3 sticky top-[8rem] self-start overflow-auto max-h-screen">
          <ul className="flex flex-col gap-1">
            {Topics.map((topic, index) => (
              <Fragment key={topic.path}>
                <li className="text-15 font-medium mb-2 flex items-center gap-3">
                  <img src={`/${topic.icon}`} alt="" width="20" height="20" />

                  {topic.title}
                </li>
                {topic.books.map((book) => (
                  <li key={book.path} className="text-14 w-full flex">
                    <NavLink
                      to={book.path}
                      className="hover:underline text-white/70 aria-[current='page']:bg-white/10 rounded-[5px] flex-1 px-3 py-1.5"
                    >
                      {book.shortname || book.title}
                    </NavLink>
                  </li>
                ))}
                {index < Topics.length - 1 ? (
                  <hr className="w-full border-white/10 my-3" />
                ) : null}
              </Fragment>
            ))}
          </ul>
        </div>
        <div className="overflow-scroll">
          <Outlet />
        </div>
      </div>

      {/* <footer className="border-t border-white/20">
        <h2 className="sr-only">Footer</h2>
      </footer> */}
    </>
  );
}
